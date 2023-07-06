import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {Nation} from '../../entities/nation.entity'
import {NationsController} from './nations.controller'
import {NationsService} from './nations.service'
import {NationsTransformer} from './nations.transformer'

@Module({
    controllers: [NationsController],
    imports: [TypeOrmModule.forFeature([Nation])],
    providers: [NationsService, NationsTransformer],
})
export class NationsModule {}
