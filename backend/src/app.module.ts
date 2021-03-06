import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const envConfig = dotenv.config().parsed;

@Module({
  imports: [
    MongooseModule.forRoot(envConfig.DB),
    AuthModule,
    ProductsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
