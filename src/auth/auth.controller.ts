import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: SignupDto){
        return this.authService.signup(dto);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: SigninDto){
        return this.authService.signin(dto);
    }
    
}
