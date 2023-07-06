import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {UserController} from './user.controller'
import {UsersService} from './user.service'
import {User} from '../../entities/user.entity'
import {UsersTransformer} from './users.transformer'

@Module({
    controllers: [UserController],
    imports: [UsersService, TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersTransformer],
})
export class UsersModule {}
