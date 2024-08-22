import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataRepository } from 'src/data/repository/data.repository';
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
    private dataRepository: DataRepository,
    private configService: ConfigService,
  ) {}
  async uploadFile(
    buffer: Buffer,
    filename: string,
    userId: number,
  ): Promise<string> {
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
      await this.dataRepository.createData({
        location,
        userId,
      });
      return location;
    } catch (e) {
      throw Error('cant get location');
    }
  }
}
