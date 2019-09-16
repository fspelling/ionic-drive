export interface Agendamento {
    nomeCliente: string;
    enderecoCliente: string;
    emailCliente: string;
    modeloCarro: string;
    precoTotal: number;
    data: string;
    enviado: boolean; // Usado no storage
    confirmado: boolean; // Usado no storage
}