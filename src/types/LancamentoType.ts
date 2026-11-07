import type { movimentacaoType } from "./AccountType";

export type LancamentoType = {
  id?: string;
  descricao: string;
  status: lancamentoStatus
  valor: number;
  categoria?: string;
  movimentacaoTipo: movimentacaoType;
  dataEmissao: string;
  dataVencimento: string;
  dataPagamento?: string | null;
  observacao?: string | null;
};

export type lancamentoStatus = 'PAGO' | 'CANCELADO' | 'PENDENTE' | 'VENCIDO';