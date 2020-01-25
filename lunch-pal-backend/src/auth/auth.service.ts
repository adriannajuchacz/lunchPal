import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from "../dto/user.dto";
import { JwtPayload } from '../interfaces/payload-login';
import { UserService } from '../providers/user-provider/user-service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(user: UserDto) {
    try {
      const accessToken = this.jwtService.sign({user}); 
      return {
        accessToken
      };
    } catch (error) {
      console.log(error);
    }
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    console.log('validateUser called');
    
    return payload.user;
  }
}
