import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatementDto {
  @ApiProperty({ required: true })
  @IsString()
  username: string;
}
