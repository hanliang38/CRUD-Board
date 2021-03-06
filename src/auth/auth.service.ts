import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async join(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async login(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken : string }> {
        const { email, username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 (secret + payload)
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken }
        } else {
            throw new UnauthorizedException('로그인 실패')
        }
     }
}
