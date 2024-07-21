"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { navigateToHome } from "./actions";

export default function Home() {
  const createLoginFormSchema = z.object({
    email: z
      .string()
      .email("Insira um email válido")
      .min(1, "Email obrigatório"),
    password: z.string().min(1, "Senha obrigatória"),
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof createLoginFormSchema>) => {
    const result = await signIn("auth-mycarenurse", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Login Inválido");
      return;
    }

    setError(null);
    navigateToHome();
    return;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-6 justify-center ">
      <div className="text-2xl font-bold text-gray-800 mb-3">MyCareNurse</div>
      <h1 className="text-3xl mb-8 text-blue-600 font-light">Login</h1>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mb-4">
          <div className="flex flex-col mb-2">
            <input
              type="text"
              placeholder="Email"
              className={`p-2 mb-4 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg`}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <input
              type="password"
              placeholder="Senha"
              className={`p-2 mb-4 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg`}
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 ">{errors.password.message}</span>
            )}
          </div>
          <p className="p-2 ">
            <Link href="/signup" className="text-blue-500 hover:underline">
              Criar nova conta
            </Link>
          </p>
        </div>

        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Entrar
        </button>
      </form>

      {error && (
        <div role="alert" className="alert alert-error mt-4">
          <span>{error}</span>
        </div>
      )}
    </main>
  );
}
