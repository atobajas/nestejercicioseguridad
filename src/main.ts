import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';
import flash = require('connect-flash');
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    // configuración de Swagger
    .setTitle('Ejemplo de API') // título del API
    .setDescription('Descripción del API Rest') // descripción
    .setVersion('1.0') // versión
    .addTag('mitag') // tag asociado
    .build(); // construcción
  const document = SwaggerModule.createDocument(app, config); // generación del documento
  SwaggerModule.setup('docs', app, document); // asociación a la aplicación y definición de la ruta de Swagger UI
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(cookieParser('1234'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(helmet());
  app.enableCors();
  //app.use(csurf());
  await app.listen(3000);
}
bootstrap();
