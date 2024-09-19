import { nacionalidadeI } from "./nacionalidades";
import { FotoI } from "./fotos";

export interface CartaI {
  id: number;
  nome: string;
  velocidade: number;
  fisico: number;
  defesa: number;
  chute: number;
  passe: number;
  drible: number;
  overall: number;
  anoNascimento: number;
  preco: number;
  comercio: boolean;
  foto: string;
  descricao?: string;
  createdAt: Date;
  updatedAt: Date;
  raridade: "BRONZE" | "PRATA" | "OURO" | "LENDA";
  nacionalidade: nacionalidadeI;
  nacionalidadeId: number;
  fotos: FotoI[];
}