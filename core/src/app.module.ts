import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './config/config.service';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.development.env' })],
  controllers: [AppController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('userService'));
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
