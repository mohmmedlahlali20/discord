import { Controller, Body, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    @Post('/register')
    register(
        @Body() registerDto: RegisterDto
    ){
        return this.authService.Register(registerDto)
    }

    @Post('/login')
    login(
        @Body()
        loginDto: LoginDto
    ){
        return this.authService.Login(loginDto)
    }
}
