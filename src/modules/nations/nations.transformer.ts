import {Injectable} from '@nestjs/common'

import {INation} from '../../interfaces/nations.interface'
import {Nation} from '../../entities/nation.entity'

@Injectable()
export class NationsTransformer {
    postgresToPublicNation(nation: Nation): INation {
        return {
            id: nation.id,
            name: nation.name,
        }
    }
}
