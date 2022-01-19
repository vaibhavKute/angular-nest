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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(authModel) {
        this.authModel = authModel;
    }
    async signUp(authDto) {
        try {
            const signup = await this.authModel.create(authDto);
            return signup;
        }
        catch (error) {
            throw new common_1.BadRequestException(JSON.stringify(error.error));
        }
    }
    async getAllUsers() {
        try {
            const getUsers = await this.authModel.find().exec();
            return getUsers;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getSingleUser(emailId) {
        try {
            const singleUser = await this.authModel.findOne({ email: emailId }).exec();
            return singleUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteUser(userId) {
        try {
            const deletedUser = await this.authModel.findOneAndDelete({ _id: userId });
            return deletedUser;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Auth')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map