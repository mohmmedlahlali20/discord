import { Controller, Body, Post, Get, Session } from '@nestjs/common';
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
        @Body() loginDto: LoginDto,
        @Session() session: Record<string, any>,

    ){
        return this.authService.Login(loginDto, session)
    }

    @Post('/logout')
    async logout(@Session() session: Record<string, any>): Promise<void> {
        try{
      await this.authService.logout(session);
        }catch(err){
            throw  err
        }
    }
}
