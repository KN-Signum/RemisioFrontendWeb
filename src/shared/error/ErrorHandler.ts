import { AxiosError } from 'axios';
import { MyLogger } from '../logger/Logger';
import { MyError } from './MyError';
import { eventBus } from '../events/EventBus';
import { ErrorAction } from './types';

const STATUS_TO_MESSAGE: Record<number, string> = {
  0: 'Network error has occured',
  400: 'Bad request.',
  401: 'Unauthorized access. Please log in again.',
  403: 'Forbidden. You don’t have permission to perform this action.',
  404: 'Resource not found.',
  409: 'Conflict detected.',
  422: 'Unprocessable entity. Invalid input data.',
  429: 'Too many requests. Please try again later.',
  500: 'Internal server error. Please try again later.',
  503: 'Service unavailable. Please try again shortly.',
} as const;

export class ErrorHandler {
  private readonly error: MyError;
  private readonly actionsToPerform: ErrorAction[];
  private readonly errorMessage: string | null;

  private constructor(
    error: unknown,
    message?: string,
    actions?: ErrorAction[],
  ) {
    this.errorMessage = message || null;
    this.error = this.castToMyError(error);
    this.actionsToPerform = actions || [];
  }
  static handleError(
    error: unknown,
    message?: string,
    actions?: ErrorAction[],
  ) {
    const errorHandler = new ErrorHandler(error, message, actions);
    errorHandler.log();
    if (errorHandler.actionsToPerform.includes('NOTIFY')) {
      errorHandler.notify();
    }
    if (errorHandler.actionsToPerform.includes('REPORT')) {
      errorHandler.report();
    }
  }
  private castToMyError(error: unknown) {
    if (error instanceof AxiosError) {
      return new MyError(error.message, error.response ? 'API' : 'NETWORK', {
        status: error.response?.status,
      });
    } else if (error instanceof MyError) return error;
    else if (error instanceof Error) return new MyError(error.message, 'APP');
    return new MyError('Unknown error has occured', 'APP');
  }
  private log() {
    MyLogger.error(this.error.errorType, this.error.message);
  }
  private notify() {
    const status = this.error.status || 0;
    const message = this.errorMessage
      ? this.errorMessage
      : STATUS_TO_MESSAGE[status];
    eventBus.emit('showNotification', message);
  }
  private report() {
    // nie ma endpointu na backendzie, do zrobienia jak taki powstanie
    MyLogger.debug(
      'API',
      'REPORT TO BACKEND IS NOT IMPLEMENTED YET',
      this.error,
    );
  }
}
