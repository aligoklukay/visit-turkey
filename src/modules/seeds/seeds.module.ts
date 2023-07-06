import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {SeedsController} from './seeds.controller'
import {SeedsService} from './seeds.service'
import {City} from '../../entities/city.entity'
import {Nation} from '../../entities/nation.entity'

@Module({
    imports: [TypeOrmModule.forFeature([City, Nation])],
    controllers: [SeedsController],
    providers: [SeedsService],
})
export class SeedsModule {}
