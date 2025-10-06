import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { transferBalanceDto } from '../transfer/dto/transfer-balance.dto';
import { AccountService } from './account.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('accounts')
export class AccountController {

    constructor(private accountService: AccountService){}

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getBalance(@GetUser() user: {userId: number}){

        const authenticatedUserId = user.userId
        
        if (!authenticatedUserId) {
            // Lança uma exceção se não encontrar o ID do usuário no token
            throw new UnauthorizedException('Token de autenticação inválido.');
        }

        return this.accountService.getBalance(authenticatedUserId);
    }
}   
