import {BadRequestException, Injectable, Logger} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {City} from '../../entities/city.entity'
import {Nation} from '../../entities/nation.entity'
import {nations} from './seed-files/nations'
import {cities} from './seed-files/cities'

@Injectable()
export class SeedsService {
    @InjectRepository(City) public cityRepository: Repository<City>
    @InjectRepository(Nation) public nationRepository: Repository<Nation>

    async migrateNations() {
        try {
            for (const nation of nations) {
                const seedNation = await this.nationRepository.create({
                    name: nation.name,
                })

                await this.nationRepository.insert(seedNation)
            }
        } catch (e) {
            Logger.log(e)
            throw new BadRequestException(e)
        }
    }

    async migrateCities() {
        try {
            for (const city of cities) {
                const seedCity = await this.cityRepository.create({
                    name: city.name,
                })

                await this.cityRepository.insert(seedCity)
            }

            return true
        } catch (e) {
            throw new BadRequestException(e)
        }
    }
}
