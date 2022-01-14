import { CommonDto } from "../../../common/dto/common-dto";
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";

export class loginDto extends CommonDto {

    @ApiProperty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @ApiProperty()
    @IsOptional()
    password: string;
}