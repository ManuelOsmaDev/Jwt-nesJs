import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("registro")
  @HttpCode(HttpStatus.OK)
  register(@Body() registerDtO:RegisterDto){
    return this.usersService.register(registerDtO);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginDto:LoginDto){
    return this.usersService.login(loginDto);
  }
}
