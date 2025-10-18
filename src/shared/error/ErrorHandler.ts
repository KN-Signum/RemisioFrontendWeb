import { AxiosError } from "axios"
import { MyLogger } from "../logger/Logger"
import { MyError } from "./MyError"
import { eventBus } from "../events/EventBus"

type ErrorType = 'API' | 'SERVER' | 'VALIDATION' | 'UNKNOWN'
type ErrorAction = 'REPORT'| 'NOTIFY'

export class ErrorHandler{
    private errorType: ErrorType
    private error: MyError
    private actionsToOccure: ErrorAction[]
    constructor(error: unknown, type: ErrorType, actions: ErrorAction[])
    {   
        this.errorType = type
        this.error = this.castToMyError(error)
        this.actionsToOccure = actions
    }
    public handleError(){
        this.log();
        if(this.actionsToOccure.includes('NOTIFY')){
            this.notify()
        }
        if(this.actionsToOccure.includes('REPORT')){
            this.report()
        }
    }
    private castToMyError(error: unknown){
         if(error instanceof AxiosError) {
             return new MyError(error.message,'API',{status: error.status, context: {'stack': error.stack}})
         }
         else if(error instanceof MyError) return error
         else if(error instanceof Error) return new MyError(error.message,this.errorType)
         return new MyError("Unknown error has occured",'UNKNOWN')
    }
    private log(){
         MyLogger.error('API',this.error.message,this.error.stack)
    }
    private notify(){
        eventBus.emit('showNotification',this.error.message)
    }
    private report(){
        // nie ma endpointu na backendzie, do zrobienia jak taki powstanie
    }
}   