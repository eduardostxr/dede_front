import { CartaI } from "./cartas"

export interface PropostaI {
  id: number
  clienteId: string
  cartaId: number
  carta: CartaI
  descricao: string
  resposta: string | null
  createdAt: string
  updatedAt: string | null
}