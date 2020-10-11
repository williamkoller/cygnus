import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AddPlayerDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly phoneNumber: string
}