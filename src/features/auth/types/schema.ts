import * as z from 'zod'
export const LoginDataSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})
export const createLoginDataSchema = function(messageEmail: string, messagePassword:string){ //To jest potrzebne żeby tłumaczenia działały 
    return z.object({
        email: z.string().email(messageEmail),
        password: z.string().min(3, messagePassword)
    })
}