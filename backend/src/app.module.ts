import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

const envConfig = dotenv.config().parsed;

@Module({
  imports: [
    MongooseModule.forRoot(envConfig.DB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
