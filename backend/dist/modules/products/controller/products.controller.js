"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = exports.dir = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const products_service_1 = require("../service/products.service");
const path_1 = require("path");
const common_constant_1 = require("../../../common/constants/common-constant");
const multer_1 = require("multer");
const product_dto_1 = require("../dto/product-dto");
const error_response_1 = require("../../../common/constants/error-response");
const axios = require('axios').default;
exports.dir = process.cwd() + '/uploads/' + '/uploads/';
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(common_constant_1.IMAGE_TYPES)) {
        return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4).fill(null).join('');
    callback(null, `${name}${randomName}${fileExtName}`);
};
let ProductsController = class ProductsController {
    constructor(productService) {
        this.productService = productService;
    }
    async getAllProducts(res) {
        try {
            const allProducts = await this.productService.getAllProducts();
            if (!allProducts)
                throw new common_1.BadRequestException('Products not found');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'All Products',
                allProducts,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async createProduct(res, file, createProductDto) {
        const response = [];
        const originalFileName = file.map((ele) => {
            const fileReponse = {
                originalname: ele.originalname,
            };
            response.push(fileReponse);
        });
        try {
            if (file && file.length <= 0) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    message: error_response_1.selectOneImage,
                });
            }
            else {
                const arr = [];
                const resp = response.map((ele) => {
                    arr.push(common_constant_1.basePath + '/uploads/' + ele.originalname);
                });
                let dtoObj = {
                    productName: createProductDto['productName'],
                    productDescription: createProductDto['productDescription'],
                    productRate: createProductDto['productRate'],
                    productUrl: arr,
                };
                const createdProduct = await this.productService.createProduct(dtoObj);
                if (!createdProduct) {
                    return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                        message: error_response_1.productNotExist,
                    });
                }
                return res.status(common_1.HttpStatus.OK).json({
                    message: error_response_1.productCreatedSucessfully,
                    createdProduct,
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, common_1.Get)('/all-products'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: exports.dir,
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array,
        product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map