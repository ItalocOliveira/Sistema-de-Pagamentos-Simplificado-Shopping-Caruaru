import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountService } from 'src/account/account.service';

import * as argon from 'argon2'
import { SigninDto } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private accountService: AccountService, private readonly jwtService: JwtService){}
    
        async signup(dto: SignupDto){
            
            const hash = await argon.hash(dto.password);
    
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hash,
                }
            });

            await this.accountService.createAccount({userId: user.id});

            delete user.password;
            console.log('Signup in: ', user.email);
            return user;
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

            console.log('Signed in: ', user.email);
            const payload = { username: user.email, sub: user.id};

            return { accessToken: this.jwtService.sign(payload)}
        }
}
