import {BadRequestException, Body, Controller, Inject, Post} from '@nestjs/common'

import {UsersService} from '../users/user.service'
import {Public} from '../../decorators/is-public.decorator'
import {UserCreateDto} from '../users/dtos/user-create.dto'
import {UsersTransformer} from "../users/users.transformer";
@Public()
@Controller('authentication')
export class AuthenticationController {
    @Inject() private readonly usersService: UsersService
    @Inject() private readonly usersTransformer: UsersTransformer

    @Post('/register')
    async register(@Body() body: UserCreateDto) {
        const userAlreadyExists = await this.usersService.findByEmail(body.email)

        if (userAlreadyExists) {
            throw new BadRequestException({
                error_code: 'user.already_exists',
                message: 'This email address is already registered.',
            })
        }

        return this.usersTransformer.postgresToPublicUser(await this.usersService.create(body))
    }
}
