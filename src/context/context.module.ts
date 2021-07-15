import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContextService } from './context.service';
import { ContextController } from './context.controller';
import { Context } from '../model/context.entity';
import { User } from '../model/user.entity';
import { Statement } from '../model/statement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Context]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Statement])],
  providers: [ContextService],
  controllers: [ContextController],
  exports: [],
})
export class ContextModule {}
