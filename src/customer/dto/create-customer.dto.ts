import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    nickname: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsOptional()
    profileImg: string
}