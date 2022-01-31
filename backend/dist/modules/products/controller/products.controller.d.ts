/// <reference types="multer" />
import { ProductsService } from '../service/products.service';
import { ProductDto } from '../dto/product-dto';
export declare const dir: string;
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsService);
    getAllProducts(res: any): Promise<any>;
    createProduct(res: any, file: Array<Express.Multer.File>, createProductDto: ProductDto): Promise<any>;
}
