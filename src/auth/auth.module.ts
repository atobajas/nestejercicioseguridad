import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from './users.service';
import { LocalStrategyService } from './local-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategyService } from './jwt-strategy.service';
import { SessionSerializer } from './session.serializer';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategyService,
    JwtStrategyService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    SessionSerializer,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
