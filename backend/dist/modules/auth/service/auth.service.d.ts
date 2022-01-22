import { Model } from 'mongoose';
import { AuthDto } from '../dto/auth-dto';
import { Auth } from '../interface/auth-interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly authModel;
    private jwtService;
    constructor(authModel: Model<Auth>, jwtService: JwtService);
    signUp(authDto: any): Promise<Auth & {
        _id: any;
    }>;
    getAllUsers(): Promise<(Auth & {
        _id: any;
    })[]>;
    getSingleUser(emailId: any): Promise<Auth>;
    deleteUser(userId: any): Promise<Auth & {
        _id: any;
    }>;
    validateUserByPassword(loginAttempt: AuthDto): Promise<{
        token: {
            expiresIn: string;
            token: string;
        };
        user: any;
    }>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    createJwtPayload(user: any): {
        expiresIn: string;
        token: string;
    };
}
