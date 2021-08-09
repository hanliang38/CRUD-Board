import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(2, {
        message: '닉네임이 너무 짧습니다.'
    })
    @MaxLength(10, {
        message: '닉네임이 너무 깁니다.'
    })
    username: string;

    @MinLength(4, {
        message: '비밀번호는 4~20자로 해주세요.'
    })
    @MaxLength(20, {
        message: '비밀번호는 4~20자로 해주세요.'
    })
    @IsString()
    //영어,숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '영어와 숫자만 사용가능합니다.'
    })
    password: string;

    @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
    email: string;
}