import {Context} from '../model/context.entity'

export interface StatementData {
  id: string;
  content: string;
  contextId: Context;
}

// user response object
export interface StatementRO {
  statement: StatementData;
}
