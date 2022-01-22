import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controller/auth.controller';
import { authSchema } from './model/auth-schema';
import { AuthService } from './service/auth.service';
import { HttpModule} from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

const envConfig = dotenv.config().parsed;

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Auth',
        schema: authSchema
      }
    ]),
    HttpModule,
    JwtModule.register({
      secret: envConfig.SECRET_KEY,
      signOptions: { expiresIn: '2d' },
    }),
  ]
})
export class AuthModule {}
