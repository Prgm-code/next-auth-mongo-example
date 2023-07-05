"use client";

import { useState, useEffect, FormEvent} from "react";

import { axiosErrorHandler } from "@/utils/errorHandler";
import {signIn, SignInResponse } from 'next-auth/react'
import { useRouter } from "next/navigation";


function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
   
  useEffect(() => {
    let timeoutId: number | undefined;

    if (error || success) {
        timeoutId = window.setTimeout(() => {
            setError(undefined);
            setSuccess(undefined);
        }, 5000);
    }

    return () => {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
        }
    };
}, [error, success]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      password: formData.get("password"),
    };


      
      const res = await signIn('credentials' ,{
        email: formData.get("email"),
        password: formData.get("password")  ,
        redirect: false

      })
      console.log(res);
     

      
      if (res?.error) return setError(res.error as string)
      if (res?.ok) return router.push('/dashboard')
      setSuccess(res?.ok ? 'Success' : undefined)

  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center ">
      <form onSubmit={handleSubmit}
      className="bg-neutral-950 px-8 py-10 w-3/12">
        <h1 className="text-4xl font-bold mb-7">Signin</h1>

        {error && <p className="bg-red-500 text-white p-2 mb-2 ">{error}</p>}
        {success && (
          <p className="bg-green-500 text-white p-2 mb-2 ">{success}</p>
        )}
        <input
          type="email"
          placeholder="someemail@mail.test"
          name="email"
          className=" bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
        <input
          type="password"
          placeholder="********"
          name="password"
          className=" bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />
        <button className="bg-indigo-500 px-4 py-2 text-white">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
