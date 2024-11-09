import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { RegisterDto } from 'src/auth/dto/register.dto';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private USerModel: Model<User>
    ){}

    async Register(registerDto: RegisterDto): Promise<User>{
        const {name, email, password} = registerDto
        const hash = await bcrypt.hash(password, 10)

        const user = await this.USerModel.create({
            name,
            email,
            password: hash
        })
        return user;
    }

    async Login(loginDto: LoginDto): Promise<User>{

        const {email, password} = loginDto
        const user = await this.USerModel.findOne({email})

        if(!email) {

             throw new UnauthorizedException('Invalid email or password')
        }
        
        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid email or password')
        }
        return user
    }
}
