import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from 'class-validator'

import {Nation} from '../../../entities/nation.entity'
import {Transform} from "class-transformer";

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    phone: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: '$property must be formatted as yyyy-mm-dd',
    })
    dateOfBirth: string

    @IsNotEmpty()
    nationality: Nation

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'There must be at least 1 number, 1 uppercase letter and 1 lowercase letter',
    })
    password: string
}
