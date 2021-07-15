import {
  Controller,
  Get,
  Post,
  Param,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { StatementService } from './statement.service';
import { Statement } from '../model/statement.entity';
import { StatementRO } from './statement.interface';

@Controller('statement')
export class StatementController {
  constructor(private readonly serv: StatementService) {}

  @Get()
  public async getAll(): Promise<Statement[]> {
    return await await this.serv.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StatementRO> {
    console.log(`getting statement with id: ${id}`);
    const statement = this.serv.get(id);
    return statement;   
  }



}
