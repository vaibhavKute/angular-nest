import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AuthDto } from '../dto/auth-dto';
import { loginDto } from '../dto/login-dto';
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
            throw new BadRequestException(error);
        }
    }

    @Get('/all-users')
    async getAllUsers(@Res() res){
        try{
            const fetchAllUsers = await this.authService.getAllUsers();

            if(!fetchAllUsers) throw new BadRequestException('Users not found');

            return res.status(HttpStatus.OK).json({
                message: 'All Users',
                fetchAllUsers,
            })
        }
        catch(error){
            throw new BadRequestException(error);
        }
    }

    @Post('/login')
    async login(@Res() res, @Body() loginObj){
        try{
            const getUser = await this.authService.getSingleUser(loginObj.email);
            if(!getUser) throw new BadRequestException('Invalid Email');

            if(loginObj.email === getUser.email && loginObj.password === getUser.password){
                return res.status(HttpStatus.OK).json({
                    message: 'User has been logged in sucessfully',
                    getUser
                });
            } else if(loginObj.email === getUser.email && loginObj.password !== getUser.password){
                return res.status(HttpStatus.OK).json({
                    message: 'Invalid Password',
                });
            } else {
                throw new BadRequestException('Error Occured');
            }
        }
        catch(error){
            throw new BadRequestException(error);
        }
    }

    @Get(':emailId')
    async singleUser(@Res() res, @Param('emailId') emailId: loginDto){
        try{
            const oneUser = await this.authService.getSingleUser(emailId);
            if(!oneUser) throw new BadRequestException('User not found')

            return res.status(HttpStatus.OK).json({
                message: 'Single User',
                oneUser
            })
        }
        catch(error){
            throw new BadRequestException(error);
        }
    }

}
