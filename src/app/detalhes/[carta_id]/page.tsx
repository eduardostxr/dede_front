"use client"
import { CartaI } from "@/utils/types/cartas";
import { FotoI } from "@/utils/types/fotos";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Detalhes() {
  const params = useParams()

  const [carta, setCarta] = useState<CartaI>()
  // const [fotos, setFotos] = useState<FotoI[]>([])

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cartas/${params.carta_id}`)
      const dados = await response.json()
      console.log(dados)
      setCarta(dados)
    }
    buscaDados()

    // async function buscaFotos() {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.carta_id}`)
    //   const dados = await response.json()
    //   console.log(dados)
    //   setFotos(dados)
    // }
    // buscaFotos()
  }, [])

  // const listaFotos = fotos.map(foto => (
  //   <div>
  //     <img className="h-auto max-w-full rounded-lg" 
  //          src={`data:image/jpg;base64, ${foto.codigoFoto}`}
  //          alt={foto.descricao} />
  //   </div>
  // ))

  return (
    <>
      <section className="flex mt-10 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl dark:border-gray-700 dark:bg-gray-800">
        <div className="w-full md:w-1/2 flex justify-center">
          <img className="w-3/5 h-auto object-cover rounded-t-lg md:rounded-none md:rounded-s-lg"
            src={carta?.foto} alt="Foto da Carta" />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal w-full md:w-1/2">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {carta?.nome}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Ano de Nascimento: {carta?.anoNascimento ? (carta.anoNascimento == 1 ? "Indefinido" : carta.anoNascimento) : ''}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Preço R$: {Number(carta?.preco)
              .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {carta?.descricao}
          </p>
        </div>
      </section>
{/* 
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaFotos}
      </div> */}

    </>
  )
}