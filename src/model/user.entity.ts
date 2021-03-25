// user.entity.ts
import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { Context } from './context.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @OneToMany(() => Context, (context) => context.UserId)
  contexts: Context[];
}
