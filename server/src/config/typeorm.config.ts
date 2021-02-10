import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT || 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_NAME : process.env.DB_NAME,
    entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    synchronize: true,
  }


  export default TypeOrmConfig