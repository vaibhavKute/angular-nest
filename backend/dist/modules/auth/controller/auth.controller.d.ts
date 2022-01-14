import { AuthDto } from '../dto/auth-dto';
import { AuthService } from '../service/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(res: any, authDto: AuthDto): Promise<any>;
    getAllUsers(res: any): Promise<any>;
}
