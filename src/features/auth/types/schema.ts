import * as z from 'zod'

export const LoginDataSchema = z.object({
    email: z.string().email(),
    password: z.string()
})