import {Injectable} from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as Yup from 'yup'

@Injectable()
export class ConfigService {
    app: {
        port: number
        cors: {
            origin?: string[]
        }
    }

    postgres: {
        host: string
        port: number
        user: string
        ssl: boolean
        password: string
        database: string
    }

    auth: {
        jwt: {
            secret: string
        }
        google: {
            clientSecret: string
            clientId: string
        }
        apple: {
            clientID: string
            callbackURL: string
            teamId: string
            keyIdentifier: string
        }
    }

    s3: {
        accessKeyId: string
        secretAccessKey: string
        region: string
        bucket: string
    }

    sendgrid: {
        apiKey: string
        sender: string
    }

    twilio: {
        accSID: string
        authToken: string
        from: string
    }

    i18n: {
        fallbackLanguage: string
    }

    constructor() {
        ConfigService.loadFromEnvFile()
        const vars = Object.assign({}, process.env) as any
        try {
            this.registerApp(vars)
            this.registerAuth(vars)
            this.registerPostgres(vars)
            this.registerSendGrid(vars)
            this.registerS3(vars)
            this.registerTwilio(vars)
            this.registerI18N(vars)
        } catch (error: any) {
            throw new Error(`Config validation error: ${error.message}`)
        }
    }

    private static loadFromEnvFile() {
        if (process.env.ENV === 'test') {
            dotenv.config({path: '.env.test'})
            return
        }
        dotenv.config()
    }

    private registerApp(vars: {[varName: string]: any}) {
        const appSchema = Yup.object().shape({
            ENV: Yup.string().oneOf(['development', 'test', 'production']).default('production'),
            APP_PORT: Yup.number().default(3000),
            APP_CORS_ORIGIN: Yup.string().optional(),
        })
        const config = appSchema.validateSync(vars, {stripUnknown: true})
        this.app = {
            port: config.APP_PORT,
            cors: {
                origin: config.APP_CORS_ORIGIN === '' ? undefined : config.APP_CORS_ORIGIN?.split(','),
            },
        }
    }

    private registerPostgres(vars: {[varName: string]: any}) {
        const appSchema = Yup.object().shape({
            POSTGRES_HOST: Yup.string().required(''),
            POSTGRES_PORT: Yup.number().required(),
            POSTGRES_USER: Yup.string().required(),
            POSTGRES_SSL: Yup.boolean().required(),
            POSTGRES_PASSWORD: Yup.string().required(),
            POSTGRES_DATABASE: Yup.string().required(),
        })

        const config = appSchema.validateSync(vars, {stripUnknown: true})
        this.postgres = {
            host: config.POSTGRES_HOST,
            port: config.POSTGRES_PORT,
            user: config.POSTGRES_USER,
            ssl: config.POSTGRES_SSL,
            password: config.POSTGRES_PASSWORD,
            database: config.POSTGRES_DATABASE,
        }
    }

    private registerAuth(vars: {[varName: string]: any}) {
        const appSchema = Yup.object().shape({
            JWT_SECRET: Yup.string().required(),
            GOOGLE_CLIENT_ID: Yup.string().optional(),
            GOOGLE_SECRET: Yup.string().optional(),
            APPLE_CLIENT_ID: Yup.string().optional(),
            APPLE_CALLBACK_URL: Yup.string().optional(),
            APPLE_TEAM_ID: Yup.string().optional(),
            APPLE_KEY_IDENTIFIER: Yup.string().optional(),
        })

        const config = appSchema.validateSync(vars, {stripUnknown: true})

        this.auth = {
            jwt: {
                secret: config.JWT_SECRET,
            },
            google: {
                clientId: config.GOOGLE_CLIENT_ID,
                clientSecret: config.GOOGLE_SECRET,
            },
            apple: {
                clientID: config.APPLE_CLIENT_ID,
                callbackURL: config.APPLE_CALLBACK_URL,
                teamId: config.APPLE_TEAM_ID,
                keyIdentifier: config.APPLE_KEY_IDENTIFIER,
            },
        }
    }

    private registerS3(vars: {[varName: string]: any}) {
        const appSchema = Yup.object().shape({
            S3_ACCESS_KEY_ID: Yup.string().optional(),
            S3_SECRET_ACCESS_KEY: Yup.string().optional(),
            S3_REGION: Yup.string().optional(),
            S3_BUCKET: Yup.string().optional(),
        })

        const config = appSchema.validateSync(vars, {stripUnknown: true})

        this.s3 = {
            accessKeyId: config.S3_ACCESS_KEY_ID,
            secretAccessKey: config.S3_SECRET_ACCESS_KEY,
            region: config.S3_REGION,
            bucket: config.S3_BUCKET,
        }
    }

    private registerSendGrid(vars: {[varName: string]: any}) {
        const appSchema = Yup.object().shape({
            SENDGRID_API_KEY: Yup.string().optional(),
            SENDGRID_SENDER: Yup.string().optional(),
        })
        const config = appSchema.validateSync(vars, {stripUnknown: true})
        this.sendgrid = {
            apiKey: config.SENDGRID_API_KEY,
            sender: config.SENDGRID_SENDER,
        }
    }

    private registerTwilio(vars: {[varName: string]: any}) {
        const appSchema = Yup.object().shape({
            TWILIO_ACC_SID: Yup.string().required(),
            TWILIO_AUTH_TOKEN: Yup.string().required(),
            TWILIO_FROM: Yup.string().required(),
        })
        const config = appSchema.validateSync(vars, {stripUnknown: true})
        this.twilio = {
            accSID: config.TWILIO_ACC_SID,
            authToken: config.TWILIO_AUTH_TOKEN,
            from: config.TWILIO_FROM,
        }
    }

    private registerI18N(vars: {[varName: string]: any}) {
        const appSchema = Yup.object().shape({
            I18N_FALLBACK: Yup.string().required(),
        })
        const config = appSchema.validateSync(vars, {stripUnknown: true})
        this.i18n = {
            fallbackLanguage: config.I18N_FALLBACK,
        }
    }
}
