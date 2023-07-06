import {Module} from '@nestjs/common'
import {TwilioModule} from 'nestjs-twilio'

import {ConfigModule} from '../../config/config.module'
import {ConfigService} from '../../config/config.service'

@Module({
    imports: [
        TwilioModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                accountSid: config.twilio.accSID,
                authToken: config.twilio.authToken,
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [],
})
export class SmsModule {}
