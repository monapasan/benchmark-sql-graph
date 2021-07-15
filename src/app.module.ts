import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './user/user.module';
import { ContextModule } from './context/context.module';
import { StatementModule } from './statement/statement.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    ContextModule,
    StatementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
