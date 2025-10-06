import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { transferBalanceDto } from 'src/transfer/dto/transfer-balance.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { TransferService } from './transfer.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('transfers')
export class TransferController {

    constructor(private transferService: TransferService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    transferBalance(@Body() dto: transferBalanceDto){
        return this.transferService.transferBalance(dto);
    }

    @Get("history")
    @UseGuards(JwtAuthGuard)
    getMyHistoryReq(@GetUser() user: {userId: number}){

        const authenticatedUserId = user.userId

        if (!authenticatedUserId) {
            // Lança uma exceção se não encontrar o ID do usuário no token
            throw new UnauthorizedException('Token de autenticação inválido.');
        }

        return this.transferService.getMyHistory(authenticatedUserId);
    }
}
