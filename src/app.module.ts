import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {ConfigModule} from './config/config.module'
import {ConfigService} from './config/config.service'
import {SeedsModule} from './modules/seeds/seeds.module'
import {AuthenticationModule} from './modules/authentication/authentication.module'
import {NationsModule} from './modules/nations/nations.module'
import {CitiesModule} from './modules/cities/cities.module'
//import {I18nModule} from 'nestjs-i18n'

@Module({
    imports: [
        ConfigModule,
        SeedsModule,
        AuthenticationModule,
        NationsModule,
        CitiesModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.postgres.host,
                port: config.postgres.port,
                username: config.postgres.user,
                password: config.postgres.password,
                database: config.postgres.database,
                entities: [__dirname + '/**/entities/*.entity.{ts,js}'],
                synchronize: true,
            }),
        }),
        // I18nModule.forRootAsync({
        //     imports: [ConfigModule],
        //     useFactory: (config: ConfigService) => ({
        //         fallbackLanguage: config.i18n.fallbackLanguage,
        //         loaderOptions: {
        //             path: [__dirname + '/modules/i18n'],
        //             watch: true,
        //         },
        //     }),
        //     inject: [ConfigService],
        // }),
    ],
    providers: [],
})
export class AppModule {}
