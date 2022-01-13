import { CommonDto } from "../../../common/dto/common-dto";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";

export class AuthDto extends CommonDto {

    @ApiProperty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @ApiProperty()
    @IsOptional()
    password: string;

    @ApiProperty()
    @IsOptional()
    firstName: string;

    @ApiProperty()
    @IsOptional()
    lastName: string;

    @ApiProperty()
    @IsOptional()
    @MinLength(10)
    mobile: number;
}