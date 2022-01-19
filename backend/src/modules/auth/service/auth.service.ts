import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { loginDto } from '../dto/login-dto';
import { Auth } from '../interface/auth-interface';

@Injectable()
export class AuthService {

    constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

    async signUp(authDto){
        try{
            const signup = await this.authModel.create(authDto);
            return signup;
        }
        catch(error){
            throw new BadRequestException(JSON.stringify(error.error));
        }
        
    }

    async getAllUsers(){
        try{
            const getUsers = await this.authModel.find().exec();
            return getUsers;
        }
        catch(error){
            throw new BadRequestException(error)
        }
    }

    async getSingleUser(emailId): Promise<Auth>{
        try{
            const singleUser = await this.authModel.findOne({email: emailId}).exec();
            return singleUser;
        }
        catch(error){
            throw new BadRequestException(error);
        }
    }

    async deleteUser(userId){
        try{    
            const deletedUser = await this.authModel.findOneAndDelete({_id: userId});
            return deletedUser;
        }
        catch(error){
            throw new BadRequestException(error);
        }
    }
}
