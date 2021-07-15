import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Context } from '../model/context.entity';
import { User } from '../model/user.entity';
import { Statement } from '../model/statement.entity';
import { ContextRO, ContextsRO } from './context.interface';
import { CreateContextDto } from './context.dto';

@Injectable()
export class ContextService {
  constructor(
    @InjectRepository(Context)
    private readonly contextRepository: Repository<Context>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Statement)
    private readonly statementRepository: Repository<Statement>,

  ) {}

  async findAll(query): Promise<ContextsRO> {
    const qb = await this.contextRepository.createQueryBuilder('context');

    // Building the query: sort the data returned by creationDate desc
    qb.orderBy('context.CreationDate', 'DESC');

    const contextsCount = await qb.getCount();

    // Add a limit
    if ('limit' in query) {
      qb.limit(query.limit);
    }

    // Execute the DB query
    const contexts = await qb.getMany();

    return { contexts, contextsCount };
  }

  async createContext(contextData: CreateContextDto): Promise<ContextRO> {

    const context = new Context();

    const userEntity = await this.userRepository.findOne(contextData.user)

    context.contextName = contextData.name;
    context.statements = [];
    context.UserId = userEntity;
    
    const contextEntity = await this.contextRepository.save(context);

    const statements = contextData.body
      .split('\n')
      .filter((statement) => statement !== '');

    const statementEntities = statements.map((statementBody) => {
      const statementEntity = new Statement();
      statementEntity.ContextId = contextEntity;
      statementEntity.content = statementBody;
      this.statementRepository.save(statementEntity);
      return statementEntity;
    });

    // contextEntity.statements = statementEntities;
    // await this.contextRepository.save(contextEntity);


    return { context };
  }
}
