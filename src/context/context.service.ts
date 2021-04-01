import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Context } from '../model/context.entity';
import { User } from '../model/user.entity';
import { ContextsRO } from './context.interface';

@Injectable()
export class ContextService {
  constructor(
    @InjectRepository(Context)
    private readonly articleRepository: Repository<Context>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(query): Promise<ContextsRO> {
    const qb = await getRepository(Context).createQueryBuilder('context');

    qb.where('1 = 1');

    if ('author' in query) {
      const author = await this.userRepository.findOne({
        username: query.author,
      });
      qb.andWhere('context.authorId = :id', { id: author.id });
    }

    qb.orderBy('context.CreationDate', 'DESC');

    const contextsCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    const contexts = await qb.getMany();

    return { contexts, contextsCount };
  }
}
