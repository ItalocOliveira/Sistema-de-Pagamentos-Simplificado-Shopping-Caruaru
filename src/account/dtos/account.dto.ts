import { IsEmpty, IsNotEmpty, IsNumber } from "class-validator";

export class AccountDto{

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}