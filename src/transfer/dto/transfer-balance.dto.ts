import { IsNotEmpty, IsNumber, IsPositive } from "class-validator"

export class transferBalanceDto {
    @IsNumber()    
    @IsNotEmpty()
    senderAccountId: number

    @IsNumber()    
    @IsNotEmpty()
    recipientAccountId: number

    @IsNumber()    
    @IsPositive()
    @IsNotEmpty()
    amount: number
}