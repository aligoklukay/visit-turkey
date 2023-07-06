import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {AuthenticationController} from './authentication.controller'
import {AuthenticationService} from './authentication.service'
import {UsersService} from '../users/user.service'
import {User} from '../../entities/user.entity'
import {UsersTransformer} from '../users/users.transformer'

@Module({
    controllers: [AuthenticationController],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthenticationService, UsersService, UsersTransformer],
})
export class AuthenticationModule {}
