import {Controller, Get, Inject, Query} from '@nestjs/common'

import {CitiesService} from './cities.service'
import {CitiesFindQuery} from './dtos/cities-find-query.dto'
import {CitiesTransformer} from './cities.transformer'
import {ICity} from '../../interfaces/cities.interface'

@Controller('cities')
export class CitiesController {
    @Inject() private readonly service: CitiesService
    @Inject() private readonly transformer: CitiesTransformer
    @Get('/')
    async findAll(@Query() query: CitiesFindQuery): Promise<ICity[]> {
        const results = await this.service.findAll(query)

        return results.map(result => this.transformer.postgresToPublicCity(result))
    }
}
