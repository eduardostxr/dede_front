"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Inputs = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export default function Register() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [senhaErro, setSenhaErro] = useState<string | null>(null);
  const router = useRouter();

  async function cadastrar(data: Inputs) {
    if (data.senha !== data.confirmarSenha) {
      setSenhaErro("As senhas não coincidem.");
      return;
    }

    setSenhaErro(null);

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      }),
    });

    const result = await response.json();

    if (response.status === 201) {
      alert("Cadastro realizado com sucesso!");
      router.push("/login");
    } else {
      alert(`${result.erro || "Erro desconhecido ao realizar o cadastro."}`);
    }
  }

  return (
    <section className="bg-orange-100 dark:bg-gray-900 mb-20">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-16 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crie sua conta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(cadastrar)}>
              <div>
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Digite seu nome"
                  required
                  {...register("nome")}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email de acesso
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Digite seu email"
                  required
                  {...register("email")}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("senha")}
                />
              </div>
              <div>
                <label htmlFor="confirmarSenha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirme sua senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  placeholder="Confirme sua senha"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("confirmarSenha")}
                />
                {senhaErro && <p className="text-red-500 text-sm">{senhaErro}</p>}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Criar Conta
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Já tem uma conta?{" "}
                <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Entrar
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
