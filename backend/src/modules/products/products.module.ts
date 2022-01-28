import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './controller/products.controller';
import { productSchema } from './model/product-schema';
import { HttpModule} from '@nestjs/axios';
import { ProductsService } from './service/products.service';


@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: productSchema
      }
    ]),
    HttpModule
  ]
})
export class ProductsModule {}
