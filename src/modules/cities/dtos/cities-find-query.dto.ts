import {IsOptional} from 'class-validator'

export class CitiesFindQuery {
    @IsOptional()
    limit?: number

    @IsOptional()
    offset?: number

    @IsOptional()
    search?: string
}
