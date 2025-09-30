import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async deleteUser(userId: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            throw new NotFoundException('Acesso negado')
        }

        await this.prisma.user.delete({
            where: {
                id: userId
            }
        })
    }

}
