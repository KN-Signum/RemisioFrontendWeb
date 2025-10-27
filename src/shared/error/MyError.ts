import { ErrorType, MyErrorOptionsType } from './types';

export class MyError extends Error {
  readonly errorType: ErrorType;
  readonly context?: MyErrorOptionsType['context'];
  readonly status?: MyErrorOptionsType['status'];

  constructor(message: string, type: ErrorType, options?: MyErrorOptionsType) {
    super(message);
    this.errorType = type;
    this.name = `MyError-${this.errorType}`;
    this.status = options?.status;
    this.context = options?.context;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.errorType,
      status: this.status,
      context: this.context,
      stack: this.stack,
    };
  }
}
