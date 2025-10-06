import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    PassportModule,
    UserModule, 
    PrismaModule, 
    AccountModule, 
    AuthModule, TransferModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
