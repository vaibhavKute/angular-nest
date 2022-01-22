"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_controller_1 = require("./controller/auth.controller");
const auth_schema_1 = require("./model/auth-schema");
const auth_service_1 = require("./service/auth.service");
const axios_1 = require("@nestjs/axios");
const jwt_1 = require("@nestjs/jwt");
const dotenv = require("dotenv");
const envConfig = dotenv.config().parsed;
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Auth',
                    schema: auth_schema_1.authSchema
                }
            ]),
            axios_1.HttpModule,
            jwt_1.JwtModule.register({
                secret: envConfig.SECRET_KEY,
                signOptions: { expiresIn: '2d' },
            }),
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map