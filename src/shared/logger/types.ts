export const LOGGER_LVL = {
    Disabled: 0,
    Error: 1,
    Warn: 2,
    Info: 3,
    Debug: 4 
}as const
export type LoggerLvlType  = (typeof LOGGER_LVL)[keyof typeof LOGGER_LVL]

export const TYPE_OF_LOG = {
    API: 0,
    MSW: 1,
    FORM: 2,
    APP: 3
}as const 
export type TypeOfLog = keyof typeof TYPE_OF_LOG