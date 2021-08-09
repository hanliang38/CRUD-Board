import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('/api/users')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('/join')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise <void> {
    return this.authService.signUp(authCredentialsDto);
    }
    
    @Post('/Login')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken : string }> {
        return this.authService.signIn(authCredentialsDto)
    }
}
