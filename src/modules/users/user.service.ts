import {BadRequestException, Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {UserCreateDto} from './dtos/user-create.dto'
import {User} from '../../entities/user.entity'

@Injectable()
export class UsersService {
    @InjectRepository(User) public repository: Repository<User>
    async create(body: UserCreateDto) {
        try {
            const newUser = await this.repository.create(body)
            return await this.repository.save(newUser)
        } catch (e) {
            throw new BadRequestException(e)
        }
    }

    async findByEmail(email: string) {
        const user = await this.repository.findOne({
            where: {
                email,
            },
        })

        return !!user
    }
}
