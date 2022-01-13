import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controller/auth.controller';
import { authSchema } from './model/auth-schema';
import { AuthService } from './service/auth.service';
import { HttpModule} from '@nestjs/axios';

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
    HttpModule
  ]
})
export class AuthModule {}
