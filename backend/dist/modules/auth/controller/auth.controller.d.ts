import { AuthDto } from '../dto/auth-dto';
import { loginDto } from '../dto/login-dto';
import { AuthService } from '../service/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(res: any, authDto: AuthDto): Promise<any>;
    getAllUsers(res: any): Promise<any>;
    login(res: any, loginObj: any): Promise<any>;
    singleUser(res: any, emailId: loginDto): Promise<any>;
    deleteUser(res: any, emailId: loginDto): Promise<any>;
}
