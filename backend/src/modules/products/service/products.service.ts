import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interface/product-interface';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel('Product')
        private readonly productModel: Model<Product>,
    ) {}

    async getAllProducts(){
        return 'Products'
    }

    async createProduct(createProductDto){
        console.log(createProductDto,'---createprod in service')
        try{
            const baseURL = await this.productModel.create(createProductDto);
            return baseURL;
        }
        catch(error){
            throw new BadRequestException(error);
        }
    }
}
