import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AuthModule } from './modules/auth/auth.module';

const envConfig = dotenv.config().parsed;

@Module({
  imports: [
    MongooseModule.forRoot(envConfig.DB),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
