import {Injectable} from '@nestjs/common'

import {City} from '../../entities/city.entity'
import {ICity} from '../../interfaces/cities.interface'

@Injectable()
export class CitiesTransformer {
    postgresToPublicCity(city: City): ICity {
        return {
            id: city.id,
            name: city.name,
        }
    }
}
