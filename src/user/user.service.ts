import { ForbiddenException, Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

import * as argon from 'argon2'

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async signup(dto: SignupDto){
        
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

    async signin(dto: SigninDto){
        // Verifica se user existe por email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        // Se não existe, lança exception
        if(!user){
            throw new ForbiddenException('Email ou senha incorretos.');
        }

        // Compara senha do dto com senha do user
        const passwordMatches = await argon.verify(user.password, dto.password);

        // Se a senha for incorreta, lança exception
        if(!passwordMatches){
            throw new ForbiddenException('Email ou senha incorretos.');
        }
    }
}
