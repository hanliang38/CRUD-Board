import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('/api/users')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('/join')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise <void> {
    return this.authService.signUp(authCredentialsDto);
    }
    
    @Post('/login')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken : string }> {
        return this.authService.signIn(authCredentialsDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log('user', user)
    }
}
