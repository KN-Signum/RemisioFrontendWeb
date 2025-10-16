import { LOGGER_LEVEL } from "@/config/constants"

const LOGGER_LVL = {
    Disabled: 0,
    Error: 1,
    Warn: 2,
    Info: 3,
    Debug: 4 
}as const
type LoggerLvlType  = (typeof LOGGER_LVL)[keyof typeof LOGGER_LVL]

class Logger{
    private lvl: LoggerLvlType
    private typeOfLog: 'API' | 'MSW' | 'FORM' | 'APP'

    public constructor(level: LoggerLvlType){
        this.lvl = level
        this.typeOfLog = 'APP'
    }
    private getTime(){
        const time = new Date().toLocaleString()
        return time
    }
    setType(type: 'API' | 'MSW' | 'FORM' | 'APP'){
        this.typeOfLog = type
        return this
    }
    debug(message:string, ...args: unknown[]){
        if(this.lvl < LOGGER_LVL.Debug) return;
        console.log("%c"+this.getTime()+" ["+this.typeOfLog+"] "+" [DEBUG] --> "+message,"color: green;",...args)
    }
    info(message:string, ...args: unknown[]){
        if(this.lvl < LOGGER_LVL.Info) return;
        console.log("%c"+ this.getTime()+" ["+this.typeOfLog+"] "+" [INFO] --> "+message,"color: dodgerblue;",...args)
    }
    warn(message:string,...args:unknown[]){
        if(this.lvl < LOGGER_LVL.Warn) return;
        console.warn("%c"+ this.getTime()+" ["+this.typeOfLog+"] "+" [WARN] --> "+message,"color: orange; font-weight: bold;",...args)
    }
    error(message:string,...args : unknown[]){
        if(this.lvl < LOGGER_LVL.Error) return;
        console.error("%c"+this.getTime()+" ["+this.typeOfLog+"] "+" [ERROR] --> "+message,"color: red; font-weight: bold;",...args)
    }
}

export const MyLogger = new Logger(LOGGER_LEVEL);