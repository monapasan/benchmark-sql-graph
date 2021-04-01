import { Context } from '../model/context.entity';

export interface ContextRO {
  context: Context;
}

export interface ContextsRO {
  contexts: Context[];
  contextsCount: number;
}
