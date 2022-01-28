import { ProductsService } from '../service/products.service';
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsService);
    getAllProducts(res: any): Promise<any>;
}
