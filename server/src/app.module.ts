import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PG_USER: Joi.string().required(),
        PG_DATABASE: Joi.string(),
        PG_PASS: Joi.number(),
        PG_HOST: Joi.string(),
        PG_PORT: Joi.number(),
        DB_NAME: Joi.string()
      })
    }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
