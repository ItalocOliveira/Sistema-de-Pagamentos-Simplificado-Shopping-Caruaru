import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto, SigninDto } from './dtos';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: SignupDto){
        return this.userService.signup(dto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: SigninDto){
        return this.userService.signin(dto);
    }

}
