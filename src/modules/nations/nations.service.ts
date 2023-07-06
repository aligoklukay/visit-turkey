import {Injectable} from '@nestjs/common'
import {Repository} from 'typeorm'
import {InjectRepository} from '@nestjs/typeorm'

import {Nation} from '../../entities/nation.entity'
import {NationsFindQuery} from './dtos/nations-find-query.dto'

@Injectable()
export class NationsService {
    @InjectRepository(Nation) public repository: Repository<Nation>
    async findAll(query: NationsFindQuery): Promise<Nation[]> {
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
