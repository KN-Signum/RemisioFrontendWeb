import { APP_LOGGING_LEVEL } from "@/config/constants"
import { LOGGER_LVL, LoggerLvlType, TypeOfLog } from "./types"


class Logger{
    private appLoggingLevel: LoggerLvlType

    public constructor(level: LoggerLvlType){
        this.appLoggingLevel = level
    }
    private getTime(){
        const time = new Date().toLocaleString('pl-PL', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
        return time
    }
    
    debug(context:TypeOfLog, message:string, ...args: unknown[]){
        if(this.appLoggingLevel < LOGGER_LVL.Debug) return;
        console.log("%c"+this.getTime()+" ["+context+"] "+" [DEBUG] --> "+message,"color: green;",...args)
    }
    info(context:TypeOfLog, message:string, ...args: unknown[]){
        if(this.appLoggingLevel < LOGGER_LVL.Info) return;
        console.log("%c"+ this.getTime()+" ["+context+"] "+" [INFO] --> "+message,"color: dodgerblue;",...args)
    }
    warn(context:TypeOfLog, message:string, ...args:unknown[]){
        if(this.appLoggingLevel < LOGGER_LVL.Warn) return;
        console.warn("%c"+ this.getTime()+" ["+context+"] "+" [WARN] --> "+message,"color: orange; font-weight: bold;",...args)
    }
    error(context:TypeOfLog, message:string, ...args : unknown[]){
        if(this.appLoggingLevel < LOGGER_LVL.Error) return;
        console.error("%c"+this.getTime()+" ["+context+"] "+" [ERROR] --> "+message,"color: red; font-weight: bold;",...args)
    }
}

export const MyLogger = new Logger(APP_LOGGING_LEVEL);