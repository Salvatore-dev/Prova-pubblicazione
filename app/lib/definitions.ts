import { z } from 'zod'

export const SignupFormSchema = z.object({ // di seguito le opzioni di Zod
    name: z
        .string()
        .min(2, { message: 'il nome deve essere di almento 2 caratteri.' })
        .trim(),
    email: z
        .string()
        .email({ message: 'Inserire una email valida!' }).trim(),
    password: z
        .string()
        .min(8, { message: 'contenere almeno 8 caratteri.' })
        .regex(/[a-zA-Z]/, { message: 'contenere almeno un carattere minuscolo e uno maiuscolo.' })
        .regex(/[0-9]/, { message: 'contenere almeno un numero.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'contenere almeno un carattere speciale.',
        })
        .trim(),
})

export type FormState =
    | {
        errors?: {
            name?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

export type SessionPayload = {
    userId: string,
    expiresAt: Date,
    userRole: string
}

export const LoginFormSchema = z.object({ // di seguito le opzioni di Zod
    email: z
        .string()
        .email({ message: 'Inserire una email valida!' }).trim(),
    password: z
        .string()
        .min(8, { message: 'contenere almeno 8 caratteri.' })
        .regex(/[a-zA-Z]/, { message: 'contenere almeno un carattere minuscolo e uno maiuscolo.' })
        .regex(/[0-9]/, { message: 'contenere almeno un numero.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'contenere almeno un carattere speciale.',
        })
        .trim(),
})

export type FormStateLogin =
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined
