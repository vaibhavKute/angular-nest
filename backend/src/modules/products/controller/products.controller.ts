import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../service/products.service';
import { extname } from 'path';
import { basePath, IMAGE_TYPES } from 'src/common/constants/common-constant';
import { diskStorage } from 'multer';
import { ProductDto } from '../dto/product-dto';
import {
  productCreatedSucessfully,
  productNotExist,
  selectOneImage,
} from 'src/common/constants/error-response';

const axios = require('axios').default;
export const dir = process.cwd() + '/uploads/' + '/uploads/';
const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(IMAGE_TYPES)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4).fill(null).join('');
  callback(null, `${name}${randomName}${fileExtName}`);
};
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/all-products')
  async getAllProducts(@Res() res) {
    try {
      const allProducts = await this.productService.getAllProducts();

      if(!allProducts) throw new BadRequestException('Products not found');

      return res.status(HttpStatus.OK).json({
        message: 'All Products',
        allProducts,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('create')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: dir,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createProduct(
    @Res() res,
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() createProductDto: ProductDto,
  ) {
    const response = [];
    const originalFileName = file.map((ele) => {
      const fileReponse = {
        originalname: ele.originalname,
      };
      response.push(fileReponse);
    });

    try {
      if (file && file.length <= 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: selectOneImage,
        });
      } else {
        const arr = [];
        const resp = response.map((ele) => {
          arr.push(basePath + '/uploads/' + ele.originalname);
        });

        let dtoObj = {
          productName: createProductDto['productName'],
          productDescription: createProductDto['productDescription'],
          productRate: createProductDto['productRate'],
          productUrl: arr,
        };

        const createdProduct = await this.productService.createProduct(dtoObj);

        if (!createdProduct) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: productNotExist,
          });
        }

        return res.status(HttpStatus.OK).json({
          message: productCreatedSucessfully,
          createdProduct,
        });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
