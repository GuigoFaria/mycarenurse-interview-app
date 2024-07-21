"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiUrl } from "@/helpers";
import { navigateToLogin } from "../actions";
export interface Nurse {
  name: string;
  email: string;
  password: string;
  registrationCouncilNursing: string;
  stateCouncilNursing: string;
}

const postNurse = async (data: Nurse) => {
  const response = await fetch(`${apiUrl}/nurses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create nurse");
  }

  return response.body;
};

export default function Signup() {
  const schema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z.string().email("Insira um email válido"),
    password: z
      .string()
      .min(8, "Sua senha deve conter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirme sua senha"),
    registrationCouncilNursing: z
      .string()
      .min(1, "Número de registro no COREN é obrigatório")
      .max(6, "Seu número de registro no COREN deve ter 6 dígitos"),
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
      registrationCouncilNursing: "",
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
    const body: Nurse = {
      name: data.name,
      email: data.email,
      password: data.confirmPassword,
      registrationCouncilNursing: data.registrationCouncilNursing,
      stateCouncilNursing: "SP",
    };

    console.log(body);

    const response = await postNurse(body);
    console.log(response);

    navigateToLogin();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center 4">
      <div className="text-2xl font-bold text-gray-800 mb-3">MyCareNurse</div>
      <h1 className="text-3xl mb-8 text-blue-600 font-light">
        Crie seu perfil
      </h1>

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
        <div className="flex flex-col max-w-72">
          {errors.registrationCouncilNursing && (
            <span className="text-red-500">
              {errors.registrationCouncilNursing.message}
            </span>
          )}
          <input
            type="text"
            placeholder="N. de registro no COREN"
            className="p-2 mb-2 border border-gray-300 rounded-lg"
            {...register("registrationCouncilNursing")}
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
            <span className="text-red-500">
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
