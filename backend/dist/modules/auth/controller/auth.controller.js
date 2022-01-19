"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("../dto/auth-dto");
const login_dto_1 = require("../dto/login-dto");
const auth_service_1 = require("../service/auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(res, authDto) {
        try {
            const getUser = await this.authService.getAllUsers();
            const authDtoEmail = authDto['email'];
            const checEmail = getUser.map((ele) => {
                const filepath = {
                    originalname: ele.email,
                };
                if (authDtoEmail === filepath.originalname) {
                    throw new common_1.BadRequestException('Email already exists');
                }
            });
            let dtoObj = {
                firstName: authDto['firstName'],
                lastName: authDto['lastName'],
                email: authDto['email'],
                password: authDto['password'],
                mobile: authDto['mobile']
            };
            const response = await this.authService.signUp(dtoObj);
            if (!response) {
                throw new common_1.BadRequestException('User not found');
            }
            return res.status(common_1.HttpStatus.OK).json({
                message: 'User Created Successfully',
                response
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getAllUsers(res) {
        try {
            const fetchAllUsers = await this.authService.getAllUsers();
            if (!fetchAllUsers)
                throw new common_1.BadRequestException('Users not found');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'All Users',
                fetchAllUsers,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async login(res, loginObj) {
        try {
            const getUser = await this.authService.getSingleUser(loginObj.email);
            if (!getUser)
                throw new common_1.BadRequestException('Invalid EmailId or Password');
            if (loginObj.email === getUser.email && loginObj.password === getUser.password) {
                return res.status(common_1.HttpStatus.OK).json({
                    message: 'User has been logged in sucessfully',
                    getUser
                });
            }
            else if (loginObj.email === getUser.email && loginObj.password !== getUser.password) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    message: 'Invalid Password',
                });
            }
            else {
                throw new common_1.BadRequestException('Error Occured');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async singleUser(res, emailId) {
        try {
            const oneUser = await this.authService.getSingleUser(emailId);
            if (!oneUser)
                throw new common_1.BadRequestException('User not found');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Single User',
                oneUser
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteUser(res, emailId) {
        try {
            const deletedUser = await this.authService.deleteUser(emailId);
            if (!deletedUser)
                throw new common_1.BadRequestException('User not found');
            return res.status(common_1.HttpStatus.OK).json({
                message: 'User deleted successfully',
                deletedUser
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('/all-users'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(':emailId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('emailId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.loginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "singleUser", null);
__decorate([
    (0, common_1.Delete)(':emailId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('emailId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.loginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUser", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map