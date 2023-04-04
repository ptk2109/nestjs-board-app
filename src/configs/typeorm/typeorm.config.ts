import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/boards/board.entity";
import { User } from "src/auth/user.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '',
	database: 'test',
	// entities: [__dirname + '/../**/*.entity.{js,ts}'],
	entities: [Board, User],
	charset: 'utf8', // charset 옵션 설정
	synchronize: true,

	// type: dbConfig.type,
	// host: process.env.RDS_HOSTNAME || dbConfig.host,
	// port: process.env.RDS_PORT || dbConfig.port,
	// username: process.env.RDS_USERNAME || dbConfig.username,
	// password: process.env.RDS_PASSWORD || dbConfig.password,
	// database: process.env.RDS_DB_NAME || dbConfig.database,
	// entities: [__dirname + '/../**/*.entity.{js,ts}'],
	// synchronize: dbConfig.synchronize
}