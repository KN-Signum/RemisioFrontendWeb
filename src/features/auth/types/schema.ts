import * as z from 'zod'
export  function createLoginDataSchema(messageEmail: string, messagePassword:string){
    return z.object({
        email: z.string().email(messageEmail),
        password: z.string().min(3, messagePassword)
    })
}