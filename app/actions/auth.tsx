"use server"
const bcrypt = require('bcrypt');

import sql_Elephant from "@/app/lib/test/connectpostgre";

import { SignupFormSchema, FormState, LoginFormSchema, FormStateLogin } from '@/app/lib/definitions'

import { createSession } from '@/app/lib/session'

import { deleteSession } from '@/app/lib/session'

import { redirect } from 'next/navigation'

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Call the provider or db to create a user...
    const { name, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)
    // 3. Insert the user into the database or call an Auth Library's API

    try {
        const data = await sql_Elephant`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        ON CONFLICT (email) DO NOTHING
        RETURNING*;
        `
        console.log(data);
        
        const user = data[0] // e' un oggetto con chiave id e una stringa
        if (!user) {
            console.log(`non ce' utente ma non catch`);
            
            return {
                errors:{
                    email: [`Email gia' esistente, riprova con un altro valore!`],
                }
            }
        }
        console.log(user);
        await createSession(user.id, user.role)


    } catch (error) {
        console.log("errore nella chiamata signup", error);
        
        return {
            message: ' Errore nella chiamata al database'
        }
    }

    // 5. Redirect user
    redirect('/nova_aetas')
}

export async function logout() {
    deleteSession()
    redirect('/login')
}

export async function login(state: FormStateLogin, formData: FormData) {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data

    try {
        const data = await sql_Elephant`
        SELECT *
        FROM users
        WHERE email = ${email}
        `
        const user = data[0] // e' un oggetto con chiave id e una stringa
        if (!user) {
            return {
                errors:{
                    email: ['Utente inesistente!'],
                }
            }
        }
        console.log(user);

        const match = await bcrypt.compare(password, user.password);
        if (match) {
           await createSession(user.id, user.role)
        } else {
            return {
                errors:{
                    password: ['la password non corrisponde'],
                }
            } 
        }
        //return NextResponse.redirect('/blog');
        

    } catch (error) {
        console.log(error);
        
        return {
            message: ' Errore nella chiamata al database'
        }
    }

    // 5. Redirect user
    redirect('/nova_aetas')
}