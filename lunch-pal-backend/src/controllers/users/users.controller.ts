import { Controller, Post, Put, Param, Body, UsePipes ,Response, Delete , Res ,HttpException , HttpStatus, UseGuards, Req,Request} from '@nestjs/common';
import { UserDto } from "../../dto/user.dto";
import { UserValidationPipe } from '../../pipes/user-validation.pipe';
import { UserRegistrationValidationSchema } from '../../validation-schemas/user-validation.schema';
import { UserLoginValidationSchema } from '../../validation-schemas/login-validation.schema';
import { UserService } from '../../providers/user-provider/user-service';
import { AuthService } from '../../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

  constructor(private userSrv : UserService, private readonly authService: AuthService){}

  @Post('reset')
  async resetUser(@Body() info){
    try{
      if (!("email" in info) || info["email"] == '' || info["email"] == null )
      {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Bad user input',
        }, 500)
      }
      await this.userSrv.resetUserPassword(info.email)
    }catch(e){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "User with given email doesn't exist",
      }, 500)
    }
  }


  @Post("new")
  @UsePipes(new UserValidationPipe(UserRegistrationValidationSchema))
  async create(@Body() user : UserDto) {
    try{
      let userDB = await this.userSrv.createUserOnDB(user)
      return {"success":true, "message":`User with the email ${userDB.email} was created successfully`}
    }catch(e){
      if(e.code === 11000){
        throw new HttpException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'User with the given email already exists',
        }, 500);
      }
    }
  }

  @Put(':id')
  async update(@Body() user : UserDto, @Param('id') id: string, @Req() req: Request) {
    let userDB = await this.userSrv.updateUserOnDB(id, user)
    if( userDB === null ) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'User with the given id doesnt\'t exists',
      }, 500);
    }
    return {"success":true,"operation_description":`User with the email ${userDB.email} and first_name ${userDB.first_name} was updated successfully`}
  }

  @Put('/block/:first_name')
  async block(@Param('first_name') first_name: string, @Req() req: Request) {
    let user = await this.userSrv.getUserByFirstName(first_name)

    if (user == null) {
        throw new Error("The user doesn't exist. We couldn't reset the password")
    }
    user.blocked = true
    await user.save()

    return {"success":true, "operation_description":`User blocked!`} 
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: string, @Req() req: Request){
    if ( req['user']._id !== id ) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Cannot delete other user',
      }, 401);
    }

    let deletedUser = await this.userSrv.deleteUserOnDB(id)
    if(deletedUser === null){
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:'User with the given id doesn\'t exist'
      }, 500);
    }
    return {"success":true, "operation_description":`User with the email ${deletedUser.email} and first_name ${deletedUser.first_name} was deleted successfully`}
  }

  @Post('login')
  @UsePipes(new UserValidationPipe(UserLoginValidationSchema))
  async login(@Body() data : UserDto) {
    try{
      let user = await this.userSrv.login(data);
      const token = await this.authService.createToken(user);
      return {"success":true, "accessToken": token.accessToken, "user": user, "message":`Logged in successfully`}
    }catch(e){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid username/password',
      }, 400)
    }
  }
}
