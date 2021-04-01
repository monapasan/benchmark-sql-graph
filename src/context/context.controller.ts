import { Get, Post, Body, Query, Param, Controller } from '@nestjs/common';
import { ContextService } from './context.service';
import { CreateContextDto } from './context.dto';

export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  @Get()
  async findAll(@Query() query): Promise<ArticlesRO> {
    return await this.contextService.findAll(query);
  }
}
