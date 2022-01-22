import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from '../dto/auth-dto';
import { Auth } from '../interface/auth-interface';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from '../interface/jwtpayload-interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto) {
    try {
      const signup = await this.authModel.create(authDto);
      return signup;
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error.error));
    }
  }

  async getAllUsers() {
    try {
      const getUsers = await this.authModel.find().exec();
      return getUsers;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getSingleUser(emailId): Promise<Auth> {
    try {
      const singleUser = await this.authModel
        .findOne({ email: emailId })
        .exec();
      return singleUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteUser(userId) {
    try {
      const deletedUser = await this.authModel.findOneAndDelete({
        _id: userId,
      });
      return deletedUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validateUserByPassword(loginAttempt: AuthDto) {
    try {
      let userToAttempt;
      if (loginAttempt.email) {
        userToAttempt = await this.getSingleUser(loginAttempt.email);
      }

      if (userToAttempt === null) {
        throw 'login attemp failed';
      }

      const passwordCheck = await this.comparePassword(
        loginAttempt.password,
        userToAttempt.password,
      );

      if (!passwordCheck) {
        throw new UnauthorizedException();
      }

      const payload = await this.createJwtPayload(userToAttempt);
      // return payload;

      // const tokenResponse = this.createJwtPayload(user);
      const objResponse = {
        token: payload,
        user: userToAttempt,
      };
      return objResponse;
    } catch (error) {
      throw error;
    }
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      const bcryptRespone = await bcrypt.compare(password, hash);

      return bcryptRespone;
    } catch (error) {
      throw error;
    }
  }

  createJwtPayload(user) {
    let data: JwtPayload = {
      phone: user.phone,
      email: user.email,
      loginId: user.loginId,
      password: user.password,
    };

    let jwt = this.jwtService.sign(data);
    return {
      expiresIn: '2d',
      token: jwt,
    };
  }
}
