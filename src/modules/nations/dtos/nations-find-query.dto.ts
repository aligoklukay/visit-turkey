import {IsOptional} from 'class-validator'

export class NationsFindQuery {
    @IsOptional()
    limit?: number

    @IsOptional()
    offset?: number

    @IsOptional()
    search?: string
}
