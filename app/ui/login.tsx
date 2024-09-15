"use client"

import * as React from 'react'
import Image from 'next/image'
import logo from '@/public/Salvatore-Tosich-logo.png'
import Link from 'next/link'
import { useState } from 'react'
import { login } from '../actions/auth'
import { useFormState, useFormStatus } from 'react-dom'
function Login() {
    const [state, action] = useFormState(login, undefined)
    const [showPassword, setShowPassword] = useState(false)
    return (
        <section className="bg-gray-100">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                    <Image className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    Salvatore Tosich Web Developer
                </Link>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Entra con il tuo account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action={action}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                                {state?.errors?.email && <p>{state.errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="flex items-center justify-between mb-2 text-sm font-medium text-gray-900 ">Password
                                    <button type='button' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ?
                                        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg> :
                                        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    }</button>
                                </label>
                                <input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                {state?.errors?.password && (
                                    <div>
                                        <p>La password deve:</p>
                                        <ul>
                                            {state.errors.password.map((error) => (
                                                <li key={error}>- {error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <LoginButton />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Non hai ancora un account? <Link href="/signup" className="font-medium text-primary-600 hover:underline">Registrati</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Invia
        </button>
    )
}
export default Login