import { BadRequestException, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductsService){}
    
    @Get('/all-products')
    async getAllProducts(@Res() res){
        try{
            const fetchAllProducts = await this.productService.getAllProducts();

            // if(!fetchAllProducts) throw new BadRequestException('Products not found');

            return res.status(HttpStatus.OK).json({
                message: 'All Products',
                fetchAllProducts,
            });
        }
        catch(error){
            throw new BadRequestException(error);
        }
    }
}
