import {NestFactory} from '@nestjs/core'

import {applyGlobalPipes} from './main.global-setup'
import {ConfigService} from './config/config.service'
import {AppModule} from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config = app.get(ConfigService)

    app.enableCors()
    applyGlobalPipes(app)
    await app.listen(config.app.port)
}

bootstrap()
