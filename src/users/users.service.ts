// import { CreateUserDto } from './dto/createuser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
    private readonly jwtService: JwtService,@InjectRepository(User)
    private readonly userRepository: Repository<User>){
  }

  async register({password, name}:RegisterDto){
      const hashedPassword = await bcryptjs.hash(password,10)
      const user = await this.crear({
          name,
          password:hashedPassword,
          rol:"user"
      })
      return {
          message: "Usuario creado con exito"
      }
  }

  async login ({name, password}:LoginDto){
      const user = await this.findOneByName(name);
  
      if (!user) {
          throw new UnauthorizedException("Usuario no encontrado");
      }
      const isPasswordValid = await bcryptjs.compare(password, user.password);
  
      if (!isPasswordValid) {
          throw new UnauthorizedException("Contraseña Incorrecta");
      }
  
      const payload = {name: user.name, password: user.password, rol: user.rol};
      const token = await this.jwtService.signAsync(payload);
  
      return {
          token: token,
          name: user.name,
          id: user.id
      };
  }

  async crear(crearUsuarioDto: CreateUserDto){
    return await this.userRepository.save(crearUsuarioDto)
  }

  async findOneByName(name:string){
    return await this.userRepository.findOne({
      where:{
        name:name
      }
    })
  }

}
