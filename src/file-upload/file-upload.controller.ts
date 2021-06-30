import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './file-upload-dto';
import { diskStorage } from 'multer';
import { editFileName } from './file-uploading.utils';

@ApiSecurity('basic')
@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.size);
    return file.size;
  }
}
