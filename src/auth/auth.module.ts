import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/configs/typeorm/typeorm-ex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
// import { JwtStrategy } from './jwt.strategy';
// import * as config from 'config';
// const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret : "jwtSecretKey5269",
      signOptions:{
        expiresIn : 60*60,
      }
    }),
    // PassportModule.register({ defaultStrategy: 'jwt'}),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || jwtConfig.secret,
    //   signOptions:{
    //     expiresIn: jwtConfig.expiresIn
    //   }
    // }),
    TypeOrmExModule.forCustomRepository([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
