import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Statement } from '../model/statement.entity';


@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(Statement) private readonly statementRepository: Repository<Statement>,
  ) {}

  // abstracting access to the model via service
  public async getAll() {
    // getting data from database
    return await this.statementRepository.find();
  }

  // abstracting access to the model via service
  public async get(id: string) {
    const statement = await this.statementRepository.findOne(id);
    if (!statement) {
      const errors = { Statement: ' not found' };
      throw new HttpException({ errors }, 401);
    }
    return this.buildStatementRO(statement);
  }

  public async getByContext(contextId: string) {
    const statements = await this.statementRepository.find({where: { contextId: contextId }});
    if (!statements) {
      const errors = { Statement: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildStatementsRO(statements);
  }

 
  private buildStatementsRO(statements: Statement[]) {
    const statementsRO = statements.map(statement => ({
      id: statement.id,
      content: statement.content,
      contextId: statement.ContextId,
    }));

    return { statements: statementsRO };
  }


  private buildStatementRO(statement: Statement) {
    const statementRO = {
      id: statement.id,
      content: statement.content,
      contextId: statement.ContextId,
    };

    return { statement: statementRO };
  }


}
