import {Controller, Get, Inject, Query} from '@nestjs/common'

import {NationsFindQuery} from './dtos/nations-find-query.dto'
import {NationsService} from './nations.service'
import {NationsTransformer} from './nations.transformer'
import {INation} from '../../interfaces/nations.interface'

@Controller('nations')
export class NationsController {
    @Inject() private readonly service: NationsService
    @Inject() private readonly transformer: NationsTransformer
    @Get('/')
    async findAll(@Query() query: NationsFindQuery): Promise<INation[]> {
        const results = await this.service.findAll(query)

        return results.map(result => this.transformer.postgresToPublicNation(result))
    }
}
