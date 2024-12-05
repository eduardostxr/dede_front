'use client'
import './page.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { PropostaI } from '@/utils/types/propostas';

export default function Propostas() {
  const [propostas, setPropostas] = useState<PropostaI[]>([])
  const { cliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas/${cliente.id}`)
      const dados = await response.json()
      setPropostas(dados)
    }
    buscaDados()
  }, [])


  function dataDMA(data: string) {
    const ano = data.substring(0, 4)
    const mes = data.substring(5, 7)
    const dia = data.substring(8, 10)
    return dia + "/" + mes + "/" + ano
  }

  const propostasTable = propostas.map(proposta => (
    <tr key={proposta.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {proposta.carta.nome}  -  {proposta.carta.raridade}
      </th>
      <td className="px-6 py-4">
        <img src={proposta.carta.foto} className="fotoCarta" alt="Foto Carta" />
      </td>
      <td className="px-6 py-4">
        <p><b>{proposta.descricao}</b></p>
        <p><i>Enviado em: {dataDMA(proposta.createdAt)}</i></p>
      </td>
      <td className="px-6 py-4">
        {proposta.resposta ?
          <>
            <p><b>{proposta.resposta}</b></p>
            <p><i>Respondido em: {dataDMA(proposta.updatedAt as string)}</i></p>
          </>
          :
          <i>Aguardando...</i>}
      </td>
    </tr>
  ))

  return (
    <section className="max-w-7xl mx-auto">
      {/* <h1 className="mb-6 mt-4 text-2xl font-extrabold leading-none tracking-tight text-colorUvaEscura md:text-4xl lg:text-5xl">
        Listagem de Minhas Propostas</h1> */}

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Modelo
            </th>
            <th scope="col" className="px-6 py-3">
              Foto
            </th>
            <th scope="col" className="px-6 py-3">
              Proposta
            </th>
            <th scope="col" className="px-6 py-3">
              Resposta
            </th>
          </tr>
        </thead>
        <tbody>
          {propostasTable}
        </tbody>
      </table>
    </section>
  )
}