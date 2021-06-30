import {
  Controller,
  Get,
  Post,
  Session,
  Response,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EjemploDto } from './ejemplo-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('sessions')
  getVisits(@Session() session: Record<string, any>) {
    return (session.visits = session.visits ? session.visits + 1 : 1);
  }
  @Get('setcookies')
  setCookie(@Response({ passthrough: true }) response) {
    response.cookie('key1', 'value', {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
    });
    // cookie segura sólo con https
    response.cookie('key2', 'value2', {
      maxAge: 1000 * 60 * 10,
      signed: true,
    });
  }
  @Get('getcookies')
  getCookies(@Request() request) {
    // para conseguir todas
    console.log(request.cookies);
    // para conseguir una en concreto
    console.log(request.cookies['clave']);
    // para conseguir las firmadas
    console.log(request.signedCookies);
  }
  @Post('swagger')
  async create(@Body() createDto: EjemploDto) {
    return `This action adds a new object with name: ${createDto.name}`;
  }
}
