import {Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'

import {City} from '../../entities/city.entity'
import {CitiesFindQuery} from './dtos/cities-find-query.dto'

@Injectable()
export class CitiesService {
    @InjectRepository(City) public repository: Repository<City>
    async findAll(query: CitiesFindQuery): Promise<City[]> {
        let findQuery = {}
        if (query.limit && query.offset) {
            findQuery = {
                offset: query.offset,
                limit: query.limit,
            }
        }

        return await this.repository.find(findQuery)
    }
}
