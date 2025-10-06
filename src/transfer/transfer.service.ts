import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { transferBalanceDto } from 'src/transfer/dto/transfer-balance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransferService {

    constructor(private prisma: PrismaService){}

    async transferBalance(dto: transferBalanceDto){
        // Não permitir tranferencia para a propria conta
        if(dto.recipientAccountId === dto.senderAccountId){
            throw new BadRequestException('A conta de origem e destino não podem ser a mesma.');
        }

        // Resgatar conta do Remetente dentro de uma transação
        return await this.prisma.$transaction(async (tx) => {
            const senderAccount = await tx.account.findUnique({
                where: {
                    id: dto.senderAccountId
                }
            });

            if(!senderAccount){
                throw new NotFoundException(`Conta de origem com ID ${dto.senderAccountId} não encontrada.`);
            }
            // Verificar se a o remetente tem saldo suficiente
            if(senderAccount.balance.lessThan(dto.amount)){
                throw new ForbiddenException('Saldo insuficiente para realizar a transferência.');
            }

            // Resgatar conta do Destinatario na transação
            const recipientAccount = await tx.account.findUnique({
                where: {
                    id: dto.recipientAccountId
                }
            });

            if(!recipientAccount){
                throw new NotFoundException(`Conta de destino com ID ${dto.recipientAccountId} não encontrada.`);
            }
            
            // Atualizar o saldo do destinatario
            const updatedSenderAccount = await tx.account.update({
                where: {
                    id: dto.senderAccountId
                },
                data: {
                    balance: {
                        decrement: dto.amount
                    }
                }
            });
            // Atualizar o saldo do destinatario
            await tx.account.update({
                where: {
                    id: dto.recipientAccountId
                },
                data: {
                    balance: {
                        increment: dto.amount
                    }
                }
            });

            // Adicionar transação ao historico

            const newTransfer = await tx.transfer.create({
                data: {
                    amount: dto.amount,
                    senderAccountId: dto.senderAccountId,
                    recipientAccountId: dto.recipientAccountId
                }
            })

            // Retornar confirmação
            return {
                message: 'Transferência realizada com sucesso!',
                newTransfer: newTransfer,
                updatedSenderAccountBalance: updatedSenderAccount.balance
            }
        });
    }

    async getMyHistory(authenticatedUserId: number){
        
        const accountWithHistory = await this.prisma.account.findUnique({
            where: {
                userId: authenticatedUserId
            },
            include: {
                sentTransfers: true,
                receivedTransfers: true
            }
        })

        if(!accountWithHistory){
            throw new NotFoundException(`Usuário com ID ${authenticatedUserId} não encontrada.`);
        }
        
        return accountWithHistory;
    }
}
