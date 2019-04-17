import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

import config from './config/express'

const port = config.port

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: config.isProduction,
      whitelist: true,
    }),
  )

  await app.listen(port)

  console.log(`App is listening on port ${port}`)
}
bootstrap()
