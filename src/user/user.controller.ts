import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Post('signup')
    createUser(@Body() dto: CreateUserDto){
        return this.userService.signup(dto);
    }

}
