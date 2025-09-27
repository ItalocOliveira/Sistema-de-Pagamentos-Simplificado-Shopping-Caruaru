import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {

    async signup(dto: CreateUserDto){
        
    }
}
