export type AccountType = {
  id: string;
  descricao: string;
  contaTipo: contaType;
  movimentacaoTipo: movimentacaoType;
  numero: string;
  agencia: string;
  status: boolean;
};

export type contaType = 'CORRENTE' | 'POUPANCA' | 'CAIXA' | 'INVESTIMENTO';

export type movimentacaoType = 'ENTRADA' | 'SAIDA';