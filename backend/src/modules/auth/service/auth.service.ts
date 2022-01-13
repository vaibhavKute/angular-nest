import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
            throw new BadRequestException(error);
        }
        
    }
}
