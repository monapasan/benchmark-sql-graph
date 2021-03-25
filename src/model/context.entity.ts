// context.entity.ts
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Statement } from './statement.entity';

@Entity({ name: 'Context' })
export class Context {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  contextName: string;

  @ManyToOne(() => User, (user) => user.contexts)
  @JoinColumn()
  UserId: User;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  CreationDate: Date;

  @OneToMany(() => Statement, (statement) => statement.ContextId)
  statements: Statement[];
}
