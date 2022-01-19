import { Model } from 'mongoose';
import { Auth } from '../interface/auth-interface';
export declare class AuthService {
    private readonly authModel;
    constructor(authModel: Model<Auth>);
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
}
