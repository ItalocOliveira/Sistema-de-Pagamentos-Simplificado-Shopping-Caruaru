import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountDto } from './dtos';
import { transferBalanceDto } from '../transfer/dtos/transfer-balance.dto';

@Injectable()
export class AccountService {

    constructor(private prisma: PrismaService){}

    async createAccount(dto: AccountDto){
        const account = await this.prisma.account.create({
            data: {
                balance: 100,
                user: {
                    connect: {
                        id: dto.userId
                    }
                }
            }
        })

        return account;
    }

    async getBalance(accountId: number){

        const account = await this.prisma.account.findUnique({
            where: {
                id: accountId
            }
        });

        if(!account){
            throw new NotFoundException('Acesso negado');
        }
        
        return {
            accountId: accountId,
            balance: account.balance
        };

    }

    async updateBalance(accountId: number, newBalance: number){

        const updatedAccount = await this.prisma.account.update({
            where: {
                id: accountId
            },
            data: {
                balance: newBalance
            }
        });

        if(!updatedAccount){
            throw new NotFoundException('Acesso negado');
        }

        return updatedAccount;

    }
}