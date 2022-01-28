import { CommonDto } from "../../../common/dto/common-dto";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";

export class ProductDto extends CommonDto {

    @ApiProperty()
    @IsEmail()
    productName: string;

    @ApiProperty()
    @IsOptional()
    productDescription: string;

    @ApiProperty()
    @IsOptional()
    productRate: Number;

}