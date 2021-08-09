import { TypeOrmModuleOptions } from '@nestjs/typeorm'

require('dotenv').config();

export const typeORMConfig: TypeOrmModuleOptions = {    
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'board-app',
        entities: [__dirname + '/../**/*.entity.{js, ts}'],
        synchronize: true
}