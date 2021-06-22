import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { LocalStrategy } from './local-strategy.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
