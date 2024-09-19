import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { History } from 'src/history/entity/history.entity';
import { HistoryRepository } from '../history/repository/history.repository';
@Injectable()
export class S3Service {
  private readonly s3Client: S3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('SECRET_ACCESS_KEY'),
    },
  });
  constructor(
    private historyRepository: HistoryRepository,
    private configService: ConfigService,
  ) {}
  async uploadFile(
    file: Express.Multer.File,
    userId: number,
  ): Promise<History> {
    const filename: string = file.originalname;

    const buffer: Buffer = file.buffer;
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'dnck-back',
          Key: filename,
          Body: buffer,
        }),
      );
      const path: string = this.configService.getOrThrow('LOCATION');
      const location: string = `${path}${filename}`;

      const file: History = await this.historyRepository.createData({
        location,
        userId,
      });

      return file;
    } catch (e) {
      console.log(e);

      throw Error('cant get location');
    }
  }
  async uploadMusic(file: Express.Multer.File): Promise<string> {
    const filename: string = file.originalname;

    const buffer: Buffer = file.buffer;
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'dnck-back',
          Key: filename,
          Body: buffer,
        }),
      );
      const path: string = this.configService.getOrThrow('LOCATION');
      const location: string = `${path}${filename}`;
      return location;
    } catch (e) {
      throw Error('cant get location');
    }
  }
}
