import { LOGGER_LEVEL } from "@/config/constants"

const loggerLvl = {
    Disabled: 0,
    Error: 1,
    Warn: 2,
    Info: 3,
    Debug: 4 
}as const
type loggerLvlType = (typeof loggerLvl)[keyof typeof loggerLvl]

class Logger{
    private lvl: loggerLvlType

    public constructor(level: loggerLvlType){
        this.lvl = level
    }
    private getTime(){
        const time = new Date().toLocaleString()
        return time
    }
    debug(message:string, ...args: unknown[]){
        if(this.lvl < loggerLvl.Debug) return;
        console.log("%c"+this.getTime()+" [DEBUG] --> "+message,"color: green;",...args)
    }
    info(message:string, ...args: unknown[]){
        if(this.lvl < loggerLvl.Info) return;
        console.log("%c"+ this.getTime()+" [INFO] --> "+message,"color: dodgerblue;",...args)
    }
    warn(message:string,...args:unknown[]){
        if(this.lvl < loggerLvl.Warn) return;
        console.warn("%c"+ this.getTime()+" [WARN] --> "+message,"color: orange; font-weight: bold;",...args)
    }
    error(message:string,...args : unknown[]){
        if(this.lvl < loggerLvl.Error) return;
        console.error("%c"+this.getTime()+" [ERROR] --> "+message,"color: red; font-weight: bold;",...args)
    }
}



export const MyLogger = new Logger(LOGGER_LEVEL);