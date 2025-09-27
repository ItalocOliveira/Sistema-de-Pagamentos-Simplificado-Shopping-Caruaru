import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as argon from 'argon2'

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async signup(dto: CreateUserDto){
        
        const hash = await argon.hash(dto.password);

        try{
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hash,
                }
            });
        }
        catch(error){
            throw error;
        }
    }
}
