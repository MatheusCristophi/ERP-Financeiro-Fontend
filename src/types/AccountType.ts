export type AccountType = {
  id: string;
  descricao: string;
  contaTipo: contaType;
  movimentacaoTipo: movimentacaoType;
  numero: string;
  agencia: string;
};

export type contaType = 'CORRENTE' | 'POUPANCA' | 'CAIXA' | 'INVESTIMENTO';

export type movimentacaoType = 'ENTRADA' | 'SAIDA';