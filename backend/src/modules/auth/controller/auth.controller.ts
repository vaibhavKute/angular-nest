import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { AuthDto } from '../dto/auth-dto';
import { loginDto } from '../dto/login-dto';
import { AuthService } from '../service/auth.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {

    saltOrRounds = 10;
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
            });

            const password = authDto['password'];
            const hashedPassword = await bcrypt.hash(password, this.saltOrRounds)
            
            let dtoObj = {
                firstName: authDto['firstName'],
                lastName: authDto['lastName'],
                email: authDto['email'],
                password: hashedPassword,
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

            const getUser = await this.authService.validateUserByPassword(loginObj);


            // const getUser = await this.authService.getSingleUser(loginObj.email);
            if(!getUser) throw new BadRequestException('Invalid EmailId or Password');
            
            // if(!await bcrypt.compare(loginObj.password, getUser.password)){
            //     throw new BadRequestException('Invalid EmailId or Password');
            // }

            // return getUser

            // if(loginObj.email === getUser.email && loginObj.password === getUser.password){
            //     return res.status(HttpStatus.OK).json({
            //         message: 'User has been logged in sucessfully',
            //         getUser
            //     });
            // } else if(loginObj.email === getUser.email && loginObj.password !== getUser.password){
            //     return res.status(HttpStatus.BAD_REQUEST).json({
            //         message: 'Invalid Password',
            //     });
            // } else {
            //     throw new BadRequestException('Error Occured');
            // }
            return res.status(HttpStatus.OK).json({
                message: "Login successfull!!",
                user:getUser.user,
                token:getUser.token
            })
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

    @Delete('delete/:userId')
    async deleteUser(@Res() res, @Param('userId') userId: loginDto){
        try{
            const deletedUser = await this.authService.deleteUser(userId);
            if(!deletedUser) throw new BadRequestException('User not found');

            return res.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                deletedUser
            })
        }
        catch(error){
            throw new BadRequestException(error);
        }
    }

}
