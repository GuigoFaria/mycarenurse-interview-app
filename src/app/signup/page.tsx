"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Signup() {
  const schema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z.string().email("Insira um email válido"),
    password: z
      .string()
      .min(8, "Sua senha deve conter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme sua senha"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "validate",
        message: "As senhas não coincidem",
      });
      return;
    }
    const body = {
      name: data.name,
      email: data.email,
      password: data.confirmPassword,
    };

    console.log(body);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center 4">
      <h1 className="text-3xl mb-8 text-blue-600 font-light">
        Crie seu perfil
      </h1>
      <div className="text-2xl font-bold text-gray-800">MyCareNurse</div>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col max-w-md">
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
          <input
            type="text"
            placeholder="Name"
            className="p-2 mb-2 border border-gray-300 rounded-lg"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col max-w-md">
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-2 mb-2 border border-gray-300 rounded-lg"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col items-center max-w-72">
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <input
            type="password"
            placeholder="Password"
            className="p-2 mb-2 border border-gray-300 rounded-lg "
            {...register("password")}
          />
        </div>
        <div className="flex flex-col max-w-md">
          {errors.confirmPassword && (
            <span className="text-red-500 mb-4">
              {errors.confirmPassword.message}
            </span>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2 mb-2 border border-gray-300 rounded-lg"
            {...register("confirmPassword")}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}
