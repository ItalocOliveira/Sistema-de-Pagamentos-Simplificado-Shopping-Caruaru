import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { transferBalanceDto } from '../transfer/dtos/transfer-balance.dto';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {

    constructor(private accountService: AccountService){}

    @Get('me/:id')
    @UseGuards(JwtAuthGuard)
    getBalance(@Param('id', ParseIntPipe) accountId: number){
        return this.accountService.getBalance(accountId);
    }
}   
