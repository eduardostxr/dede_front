import { create } from 'zustand'
import { ClienteI } from '@/utils/types/clientes'

type ClienteStore = {
    cliente: ClienteI
    logaCliente: (clienteLogado: ClienteI) => void
    deslogaCliente: () => void
}

export const useClienteStore = create<ClienteStore>((set) => ({
    cliente: {} as ClienteI,
    logaCliente: (clienteLogado) => set({ cliente: clienteLogado }),
    deslogaCliente: () => set({ cliente: {} as ClienteI }),
     
    //cliente: {
    // id: "hdshbh",
    // nome: "Mateus Freitas",
    // email:"mateus@gmail.com"
    //}
    // bears: 0,
    //increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    //removeAllBears: () => set({ bears: 0 }),
    //updateBears: (newBears) => set({ bears: newBears }),
}))