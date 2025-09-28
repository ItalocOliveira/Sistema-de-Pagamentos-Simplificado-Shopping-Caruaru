import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountDto } from './dto';
import { connect } from 'http2';

@Injectable()
export class AccountService {

    constructor(private prisma: PrismaService){}

    async createAccount(dto: AccountDto){
        try{
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
        catch(error){
            throw error;
        }
    }
}

