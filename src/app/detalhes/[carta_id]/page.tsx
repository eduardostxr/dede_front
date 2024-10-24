"use client"
import { CartaI } from "@/utils/types/cartas";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";

export default function Detalhes() {
  const params = useParams()
  const { cliente } = useClienteStore();
  const [carta, setCarta] = useState<CartaI>()
  const [proposta, setProposta] = useState<string>(""); // estado para armazenar a proposta

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/cartas/${params.carta_id}`)
      const dados = await response.json()
      console.log(dados)
      setCarta(dados)
    }
    buscaDados()
  }, [params.carta_id])

  const enviarProposta = async () => {
    if (!cliente || !cliente.id) {
      alert("Você precisa estar logado para fazer uma proposta.");
      return;
    }

    const propostaData = {
      cartaId: carta?.id,
      clienteId: cliente.id,
      descricao: proposta,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propostaData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar a proposta');
      }

      const resultado = await response.json();
      console.log("Proposta enviada:", resultado);
      setProposta("");
    } catch (error) {
      console.error(error);
    }
  };

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

          {cliente && cliente.id ? (
            <>
              <input 
                type="text" 
                value={proposta} 
                onChange={(e) => setProposta(e.target.value)} 
                placeholder="Faça sua proposta..." 
                className="border rounded p-2 mb-2"
              />
              <button 
                onClick={enviarProposta}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Enviar Proposta
              </button>
            </>
          ) : (
            <h5 className="mb-3 text-xl text-gray-700 dark:text-white">
              *Para fazer uma proposta, faça login.*
            </h5>
          )}
        </div>
      </section>
    </>
  );
}
