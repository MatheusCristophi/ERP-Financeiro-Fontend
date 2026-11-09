<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { buscarLancamentos, criarLancamento, deletarLancamento } from '../api/Api';
import type { LancamentoType } from '../types/LancamentoType';

const lancamentos = ref<LancamentoType[]>([]);
const carregando = ref(true);
const erro = ref<string | null>(null);
const mostrarFormulario = ref(false);
const actualPage = ref(0);
const maxPage = ref(0);
const pessoaId = ref('');
const sizePage = ref(10);
const orderBy = ref('dataEmissao,desc')

const lancamentoForm = ref<LancamentoType>({
    id: '',
    descricao: '',
    status: 'PENDENTE',
    valor: 0,
    categoria: '',
    movimentacaoTipo: 'ENTRADA',
    dataEmissao: "",
    dataVencimento: "",
    dataPagamento: null,
    observacao: ""
});

const carregarLancamentos = async () => {
    try {
        carregando.value = true;
        erro.value = null;
        const res = await buscarLancamentos(actualPage.value, sizePage.value, orderBy.value);
        lancamentos.value = Array.isArray(res) ? res : res.content;
        maxPage.value = res.totalPages
    } catch {
        erro.value = "Não foi possível carregar os lançamentos.";
    } finally {
        carregando.value = false;
    }
};

const salvarLancamento = async () => {
    try {
        const payload = {
            ...lancamentoForm.value,

            dataEmissao: `${lancamentoForm.value.dataEmissao}T00:00:00`,

            dataVencimento: `${lancamentoForm.value.dataVencimento}T00:00:00`,

            dataPagamento: lancamentoForm.value.dataPagamento
                ? `${lancamentoForm.value.dataPagamento}T00:00:00`
                : null
        };
        await criarLancamento(payload, pessoaId.value);
        mostrarFormulario.value = false;
        await carregarLancamentos();
    } catch {
        erro.value = "Erro ao salvar lançamento.";
    }
};

const removerLancamento = async (id?: string) => {
    if (!id) return;
    if (confirm("Deseja realmente remover este lançamento?")) {
        try {
            await deletarLancamento(id);
            await carregarLancamentos();
        } catch {
            erro.value = "Erro ao remover lançamento.";
        }
    }
};

onMounted(() => {
    carregarLancamentos();
});
</script>

<template>
    <div class="modulo-container">
        <div class="header">
            <div>
                <span class="eyebrow">Movimentações Financeiras</span>
                <h2>Lançamentos</h2>
            </div>

            <div class="acoes-header">
                <button type="button" class="btn-secundario" @click="carregarLancamentos">
                    Atualizar dados
                </button>
                <button type="button" class="btn-primary" @click="mostrarFormulario = !mostrarFormulario">
                    {{ mostrarFormulario ? 'Cancelar' : 'Novo lançamento' }}
                </button>
            </div>
        </div>

        <div v-if="carregando" class="estado">
            <p>Carregando lançamentos...</p>
        </div>

        <div v-else-if="erro" class="estado erro">
            <p>{{ erro }}</p>
            <button type="button" class="btn-secundario" @click="carregarLancamentos">Tentar novamente</button>
        </div>

        <div v-else class="conteudo">
            <div v-if="mostrarFormulario" class="formulario">
                <div class="form-header">
                    <h3>Cadastrar novo lançamento</h3>
                </div>

                <div class="form-grid">
                    <label>
                        <span>Descrição</span>
                        <input v-model="lancamentoForm.descricao" type="text"
                            placeholder="Ex: Pagamento de fornecedor" />
                    </label>

                    <label>
                        <span>Tipo</span>
                        <select v-model="lancamentoForm.movimentacaoTipo">
                            <option value="ENTRADA">Entrada</option>
                            <option value="SAIDA">Saída</option>
                        </select>
                    </label>

                    <label>
                        <span>Valor (R$)</span>
                        <input v-model.number="lancamentoForm.valor" type="number" step="0.01" placeholder="0.00" />
                    </label>

                    <label>
                        <span>Data de Emissão</span>
                        <input v-model="lancamentoForm.dataEmissao" type="date" lang="pt-BR" />
                    </label>

                    <label>
                        <span>Data de Vencimento</span>
                        <input v-model="lancamentoForm.dataVencimento" type="date" lang="pt-BR" />
                    </label>

                    <label>
                        <span>Data de Pagamento</span>
                        <input v-model="lancamentoForm.dataPagamento" type="date" lang="pt-BR" />
                    </label>

                    <label>
                        <span>Status</span>
                        <select v-model="lancamentoForm.status">
                            <option value="PENDENTE">Pendente</option>
                            <option value="PAGO">Pago</option>
                            <option value="VENCIDO">Vencido</option>
                            <option value="CANCELADO">Cancelado</option>
                        </select>
                    </label>

                    <label>
                        <span>Id da Categoria</span>
                        <input v-model="lancamentoForm.categoria" type="text" />
                    </label>

                    <label>
                        <span>Id da Pessoa</span>
                        <input v-model="pessoaId" type="text" />
                    </label>

                    <div>
                        <span>Observações</span>
                        <input class="obs" v-model="lancamentoForm.observacao" type="text" />
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secundario" @click="mostrarFormulario = false">Cancelar</button>
                    <button type="button" class="btn-primary" @click="salvarLancamento">Salvar lançamento</button>
                </div>
            </div>

            <div v-if="lancamentos.length === 0 && !mostrarFormulario" class="vazio">
                <p>Nenhum lançamento registrado até o momento.</p>
                <button type="button" class="btn-primary" @click="mostrarFormulario = true">Novo lançamento</button>
            </div>

            <div v-else-if="!mostrarFormulario" class="tabela-wrapper">
                <table class="tabela">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Data de Emissão</th>
                            <th>Data de Vencimento</th>
                            <th>Data de Pagamento</th>
                            <th>Status</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in lancamentos" :key="item.id">
                            <td>{{ item.descricao }}</td>
                            <td>
                                <span :class="['tag', item.movimentacaoTipo.toLowerCase()]">{{ item.movimentacaoTipo
                                    }}</span>
                            </td>
                            <td>R$ {{ Number(item.valor || 0).toFixed(2) }}</td>
                            <td>{{ $formatDate(item.dataEmissao) }}</td>
                            <td>{{ $formatDate(item.dataVencimento) }}</td>
                            <td>{{ item.dataPagamento ? $formatDate(item.dataPagamento) : '-' }}</td>
                            <td>{{ item.status }}</td>
                            <td>
                                <button v-if="item.id" type="button" class="btn-delete"
                                    @click="removerLancamento(item.id)">Excluir</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="btn-page">
                <button @click="actualPage -= 1; carregarLancamentos();" :disabled="Number(actualPage) === 0"><</button>
                <button @click="actualPage += 1; carregarLancamentos()" :disabled="Number(actualPage) === (maxPage - 1) ">></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modulo-container {
    display: flex;
    flex-direction: column;
    min-height: 87vh;
    margin: 30px;
    padding: 28px;
    border: 1px solid var(--third-background-color);
    border-radius: 20px;
    background: var(--primary-background-color);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.02);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.acoes-header {
    display: flex;
    align-items: center;
    gap: 10px;
}

.eyebrow {
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ph-color);
    opacity: 0.75;
}

h2 {
    color: var(--option-color);
    font-size: clamp(1.8rem, 2vw, 2.5rem);
}

.btn-primary,
.btn-secundario {
    border: none;
    border-radius: 12px;
    padding: 12px 18px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

.btn-primary {
    background: var(--option-color);
    color: var(--primary-background-color);
}

.btn-secundario {
    background: var(--secondary-background-color);
    border: 1px solid var(--third-background-color);
    color: var(--option-color);
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 18px;
    border: 1px solid var(--third-background-color);
    background: var(--secondary-background-color);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(220px, 1fr));
    gap: 18px;

    .obs {
        height: 100px;
    }
}

label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--ph-color);
    font-size: 0.9rem;
}

input,
select {
    width: 100%;
    border: 1px solid var(--third-background-color);
    background: var(--primary-background-color);
    color: var(--option-color);
    border-radius: 10px;
    padding: 12px 14px;
    font: inherit;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.tabela-wrapper {
    overflow-x: auto;
    border-radius: 12px;
    border: 1px solid var(--third-background-color);
}

.tabela {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

.tabela th,
.tabela td {
    padding: 14px 18px;
    border-bottom: 1px solid var(--third-background-color);
}

.tag {
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
}

.tag.receita {
    background: #e6f4ea;
    color: #137333;
}

.tag.despesa {
    background: #fce8e6;
    color: #c5221f;
}

.btn-delete {
    background: transparent;
    border: none;
    color: #9d2a2a;
    font-size: 0.85rem;
    cursor: pointer;
}

.estado,
.vazio {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 250px;
    gap: 14px;
    color: var(--ph-color);
}

.estado.erro {
    color: #9d2a2a;
}

.btn-page {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    button {
        width: 100px;
        height: 40px;
        background-color: black;
        color: white;
        border: none;
        border-radius: 10px;
    }

    button:hover {
        cursor: pointer;
        background-color: rgb(22, 22, 22);
    }
}
</style>
