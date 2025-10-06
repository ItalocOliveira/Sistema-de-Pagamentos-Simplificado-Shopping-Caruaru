import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { transferBalanceDto } from 'src/transfer/dtos/transfer-balance.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { TransferService } from './transfer.service';

@Controller('transfers')
export class TransferController {

    constructor(private transferService: TransferService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    transferBalance(@Body() dto: transferBalanceDto){
        return this.transferService.transferBalance(dto);
    }

    @Get("history/:id")
    @UseGuards(JwtAuthGuard)
    getHistory(@Param('id', ParseIntPipe) accountId: number){
        return this.transferService.getHistory(accountId);
    }
}
