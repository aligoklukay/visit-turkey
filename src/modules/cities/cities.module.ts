import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {CitiesController} from './cities.controller'
import {City} from '../../entities/city.entity'
import {CitiesService} from './cities.service'
import {CitiesTransformer} from "./cities.transformer";

@Module({
    controllers: [CitiesController],
    imports: [TypeOrmModule.forFeature([City])],
    providers: [CitiesService, CitiesTransformer],
})
export class CitiesModule {}
