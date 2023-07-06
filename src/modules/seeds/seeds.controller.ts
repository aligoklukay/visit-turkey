import {Controller, Get, Inject} from '@nestjs/common'

import {SeedsService} from './seeds.service'
import {Public} from '../../decorators/is-public.decorator'
@Public()
@Controller('seeds')
export class SeedsController {
    @Inject() private readonly service: SeedsService

    @Get('/nations')
    async migrateNations() {
        return await this.service.migrateNations()
    }

    @Get('/cities')
    async migrateCities() {
        return await this.service.migrateCities()
    }
}
