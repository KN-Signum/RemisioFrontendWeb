type ErrorType = 'API' | 'SERVER' | 'VALIDATION' | 'UNKNOWN'
type MyErrorOptionsType = {
    status?: number,
    context?: Record<string,unknown>
}
export class MyError extends Error{
    private errorType: ErrorType;
    private context?: Record<string,unknown>;
    private status?: number;

    constructor(message:string, type: ErrorType, options?: MyErrorOptionsType){
        super(message)
        this.errorType = type
        this.name = `MyError - ${this.errorType}`
        this.status = options?.status
        this.context = options?.context
    }
    toJSON() {
        return {
          message: this.message,
          type: this.errorType,
          status: this.status,
          context: this.context,
        };
    }
}