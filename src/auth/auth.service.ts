import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as crypto from 'crypto';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService
	) { }

	/**
	 * 회원가입
	 */
	signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.userRepository.createUser(authCredentialsDto);
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}> {
		const { username, password } = authCredentialsDto;
		const user = await this.userRepository.findOne({
			where: {
				username
			},
		});

		const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
		if (user && hashedPassword === user.password) {

			// 유저 토큰 생성 ( Secret + Payload )
			const payload = { username };
			const accessToken = await this.jwtService.sign(payload);

			return { accessToken };
		} else {
			throw new UnauthorizedException('login failed')
		}
	}
}
