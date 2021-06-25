import {
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { LoginGuard } from '../guards/login.guard';
import { Role } from '../role.enum';
import { Roles } from '../roles.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @UseGuards(LoginGuard)
  @Post('auth/login')
  async login(@Request() req, @Session() session: Record<string, any>) {
    const response = await this.authService.login(req.user);
    session.user = response.payload;
    return { access_token: response.access_token };
    //return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // Guard custom propio
  @UseGuards(AuthenticatedGuard)
  @Get('miguard')
  getGuard() {
    return 'logueado';
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.Admin)
  @Get('roles')
  getRole(@Request() req) {
    //console.log('logueado como Admin');
    return req.user.username;
  }
}
