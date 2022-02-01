import { Model } from 'mongoose';
import { Product } from '../interface/product-interface';
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    getAllProducts(): Promise<(Product & {
        _id: any;
    })[]>;
    createProduct(createProductDto: any): Promise<Product & {
        _id: any;
    }>;
}
