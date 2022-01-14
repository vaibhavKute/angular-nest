import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthDto } from '../dto/auth-dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/sign-up')
    async signUp(@Res() res, @Body() authDto: AuthDto){
        try{
            const response = await this.authService.signUp(authDto);
            if(!response){
                throw new BadRequestException('User not found')
            }
            return res.status(HttpStatus.OK).json({
                message: 'User Created Successfully',
                response
            });
        }
        catch(error){
            throw new BadRequestException(error.response);
        }
    }





}
