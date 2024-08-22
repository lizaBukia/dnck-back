import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Public } from 'src/auth/guard/publick.key';
import { S3Service } from './s3.service';
@Controller('storage')
export class StorageController {
  constructor(private readonly s3Service: S3Service) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image' })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<string> {
    const filename:string = file.originalname;

    const buffer:Buffer = file.buffer;

    const [token, type] = await req.headers.authorization.split(' ');
    if (type !== 'Bearer') {
      throw new Error('Invalid Token');
    }

    const decodedToken: string | jwt.JwtPayload = jwt.decode(token);

    const userId: number = (decodedToken as jwt.JwtPayload).userId;
    return await this.s3Service.uploadFile(buffer, filename, userId);
  }
}
