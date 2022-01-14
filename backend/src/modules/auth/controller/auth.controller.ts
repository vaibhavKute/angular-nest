import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthDto } from '../dto/auth-dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/sign-up')
    async signUp(@Res() res, @Body() authDto: AuthDto){
        try{

            const getUser = await this.authService.getAllUsers();
            const authDtoEmail = authDto['email'];
            
            const checEmail = getUser.map((ele)=>{
                const filepath = {
                    originalname: ele.email,
                }
                if(authDtoEmail === filepath.originalname){
                    throw new BadRequestException('Email already exists');
                }
            })
            
            let dtoObj = {
                firstName: authDto['firstName'],
                lastName: authDto['lastName'],
                email: authDto['email'],
                password: authDto['password'],
                mobile: authDto['mobile']
            }

            const response = await this.authService.signUp(dtoObj);
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
