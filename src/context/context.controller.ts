import { Get, Post, Body, Query, Param, Controller } from '@nestjs/common';
import { ContextService } from './context.service';
import { ContextsRO, ContextRO } from './context.interface';
import { CreateContextDto } from './context.dto';

export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  @Get()
  async findAll(@Query() query): Promise<ContextsRO> {
    return await this.contextService.findAll(query);
  }

  @Post()
  async create(
    @Body('context') contextData: CreateContextDto,
  ): Promise<ContextRO> {
    return await this.contextService.createContext(contextData);
  }
}
