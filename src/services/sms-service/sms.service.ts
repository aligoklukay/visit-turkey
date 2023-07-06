import {Inject, Injectable} from '@nestjs/common'
import {TwilioService} from 'nestjs-twilio'

import {ConfigService} from '../../config/config.service'

@Injectable()
export class SmsService {
    @Inject() private readonly twilioService: TwilioService
    @Inject() private readonly config: ConfigService

    async sendSMS(smsNumber, smsBody) {
        return this.twilioService.client.messages.create({
            body: smsBody,
            from: this.config.twilio.from,
            to: smsNumber,
        })
    }
}
