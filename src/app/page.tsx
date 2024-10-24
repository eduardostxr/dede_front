'use client'
import { InputPesquisa } from "@/components/InputPesquisa"
import { ItemCarros } from "@/components/ItemCartas";
import { CartaI } from "@/utils/types/cartas";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner'
import { useClienteStore } from "@/context/cliente";

export default function Home() {
  const [cartas, setCartas] = useState<CartaI[]>([])
  const { logaCliente } = useClienteStore()

  useEffect(() => {

    async function buscaCliente(idCliente: string) {
      console.log(idCliente)
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`)
      if (response.status == 200) {
        const dados = await response.json()
        logaCliente(dados)
        
      }
    }

    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string
      buscaCliente(idClienteLocal)
    }

    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cartas`)
      const dados = await response.json()
      setCartas(dados)
    }
    buscaDados()
  }, [])

  const listaCarros = cartas.map( carta => (
    <ItemCarros data={carta} key={carta.id} />
  ))

  return (
    <main className="bg-gray-900">
      <InputPesquisa setCartas={setCartas} />

      <section className="bg-gray-900 max-w-screen-xl mx-auto">
        <h1 className="mb-5 mt-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Cartas <span className="underline underline-offset-3 decoration-8 decoration-yellow-800">em destaque</span></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 pb-3 md:grid-cols-3 gap-3">
          {listaCarros}
        </div>

      </section>
      <Toaster position="top-right" richColors />
    </main>
  );
}
