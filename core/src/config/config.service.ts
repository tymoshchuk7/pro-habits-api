import { Transport, ClientOptions } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: ClientOptions | string } = null;

  constructor() {
    this.envConfig = {
      port: process.env.API_GATEWAY_PORT,
      userService: {
        options: {
          port: process.env.USER_SERVICE_PORT,
          host: process.env.USER_SERVICE_HOST,
        },
        transport: Transport.TCP,
      },
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
