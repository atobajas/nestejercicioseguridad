import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FileUploadController } from './file-upload/file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [AppController, FileUploadController],
  providers: [AppService],
})
export class AppModule {}
