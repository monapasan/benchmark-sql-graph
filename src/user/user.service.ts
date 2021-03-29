import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { CreateUserDto } from './user.dto';
import { User } from '../model/user.entity';
import { UserRO } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  // abstracting access to the model via service
  public async getAll() {
    // getting data from database
    return await this.repo.find();
  }

  // abstracting access to the model via service
  public async get(id: string) {
    const user = await this.repo.findOne(id);
    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  public async getByName(name: string) {
    const user = await this.repo.findOne({ username: name });
    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { username } = dto;
    const qb = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username });

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new User();
    newUser.username = username;
    newUser.contexts = [];

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.repo.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  private buildUserRO(user: User) {
    const userRO = {
      id: user.id,
      username: user.username,
    };

    return { user: userRO };
  }
}
