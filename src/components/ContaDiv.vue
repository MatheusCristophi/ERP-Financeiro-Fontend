<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { buscarContas, criarConta, desativarConta } from '../api/Api';
import type { AccountType } from '../types/AccountType';

const contas = ref<AccountType[]>([]);
const carregando = ref(true);
const erro = ref<string | null>(null);
const mostrarFormulario = ref(false);

const estadoInicialForm: AccountType = {
    id: '',
    descricao: '',
    contaTipo: 'CORRENTE',
    movimentacaoTipo: 'ENTRADA',
    numero: '',
    agencia: ''
};

const contaForm = ref<AccountType>({ ...estadoInicialForm });

const carregarContas = async () => {
    try {
        carregando.value = true;
        erro.value = null;
        const res = await buscarContas();
        contas.value = Array.isArray(res) ? res : [];
    } catch {
        erro.value = "Não foi possível carregar as contas bancárias.";
    } finally {
        carregando.value = false;
    }
};

const alternarFormulario = () => {
    mostrarFormulario.value = !mostrarFormulario.value;
    if (!mostrarFormulario.value) {
        contaForm.value = { ...estadoInicialForm };
    }
};

const salvarConta = async () => {
    try {
        await criarConta(contaForm.value);
        mostrarFormulario.value = false;
        contaForm.value = { ...estadoInicialForm };
        await carregarContas();
    } catch {
        erro.value = "Erro ao salvar conta.";
    }
};

const removerConta = async (id: string) => {
    if (!id) return;
    if (confirm("Deseja realmente remover esta conta?")) {
        try {
            await desativarConta(id);
            await carregarContas();
        } catch {
            erro.value = "Erro ao remover conta.";
        }
    }
};

onMounted(() => {
    carregarContas();
});
</script>

<template>
    <div class="modulo-container">
        <div class="header">
            <div>
                <span class="eyebrow">Gestão Financeira</span>
                <h2>Contas Bancárias e Caixas</h2>
            </div>

            <div class="acoes-header">
                <button type="button" class="btn-secundario" @click="carregarContas">
                    Atualizar dados
                </button>
                <button type="button" class="btn-primary" @click="alternarFormulario">
                    {{ mostrarFormulario ? 'Cancelar' : 'Nova conta' }}
                </button>
            </div>
        </div>

        <div v-if="carregando" class="estado">
            <p>Carregando contas...</p>
        </div>

        <div v-else-if="erro" class="estado erro">
            <p>{{ erro }}</p>
            <button type="button" class="btn-secundario" @click="carregarContas">Tentar novamente</button>
        </div>

        <div v-else class="conteudo">
            <div v-if="mostrarFormulario" class="formulario">
                <div class="form-header">
                    <h3>Cadastrar nova conta</h3>
                </div>

                <div class="form-grid">
                    <label>
                        <span>Nome da conta / Banco</span>
                        <input v-model="contaForm.descricao" type="text" placeholder="Ex: Nubank, Caixa Empresa" />
                    </label>

                    <label>
                        <span>Tipo de Conta</span>
                        <select v-model="contaForm.contaTipo">
                            <option value="CORRENTE">Conta Corrente</option>
                            <option value="POUPANCA">Poupança</option>
                            <option value="INVESTIMENTO">Investimento</option>
                            <option value="CAIXA">Caixa Físico</option>
                        </select>
                    </label>

                    <label>
                        <span>Tipo de Movimentação</span>
                        <select v-model="contaForm.movimentacaoTipo">
                            <option value="ENTRADA">Entrada</option>
                            <option value="SAIDA">Saída</option>
                        </select>
                    </label>

                    <label>
                        <span>Agência</span>
                        <input v-model="contaForm.agencia" type="text" placeholder="0001" maxlength="5" />
                    </label>

                    <label>
                        <span>Número da Conta</span>
                        <input v-model="contaForm.numero" type="text" placeholder="12345-6" maxlength="13" />
                    </label>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secundario" @click="alternarFormulario">Cancelar</button>
                    <button type="button" class="btn-primary" @click="salvarConta">Salvar conta</button>
                </div>
            </div>

            <div v-else-if="contas.length > 0" class="grid">
                <div v-for="conta in contas" :key="conta.id" class="info-card">
                    <div class="card-topo">
                        <span>{{ conta.descricao }}</span>
                        <button type="button" class="btn-delete" @click="removerConta(conta.id)">&#10005;</button>
                    </div>
                    <div>
                        <p>Id: {{ conta.id }}</p>
                        <p>Tipo de Conta: {{ conta.contaTipo }}</p>
                        <p>Tipo de Movimentação: {{ conta.movimentacaoTipo }}</p>
                        <p>Número da Conta: {{ conta.numero }}</p>
                        <p>Agência: {{ conta.agencia }}</p>
                    </div>
                </div>
            </div>

            <div v-else class="vazio">
                <p>Nenhuma conta bancária cadastrada ainda.</p>
                <button type="button" class="btn-primary" @click="mostrarFormulario = true">Cadastrar primeira conta</button>
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

.btn-primary, .btn-secundario {
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

.btn-primary:hover, .btn-secundario:hover {
    opacity: 0.9;
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
}

label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--ph-color);
    font-size: 0.9rem;
}

input, select {
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

.grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.info-card {
    background: var(--secondary-background-color);
    border: 1px solid var(--third-background-color);
    border-radius: 16px;
    padding: 20px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.card-topo {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card-topo span {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--ph-color);
    opacity: 0.7;
}

.btn-delete {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    color: #9d2a2a;
    cursor: pointer;
}

.estado, .vazio {
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
</style>