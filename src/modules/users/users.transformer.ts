import {Injectable} from '@nestjs/common'
import {IUser} from '../../interfaces/users.interface'
import {User} from '../../entities/user.entity'

@Injectable()
export class UsersTransformer {
    postgresToPublicUser(user: User): IUser {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            nationality: {
                id: user.nationality.id,
                name: user.nationality.name,
            },
        }
    }
}
