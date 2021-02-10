import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './components/product/product.module';
import { BatchModule } from './components/batch/batch.module';
import { UserModule } from './components/user/user.module';
import { CategoryModule } from './components/category/category.module';
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
    DatabaseModule, ProductModule, BatchModule, UserModule, CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
