<script lang="ts" setup>
import { computed, onMounted, ref, toRaw } from 'vue';
import { buscarEmpresaAtual, criarEmpresa } from '../api/Api';
import type { EnterpriseType } from '../types/EnterpriseType';

const role = localStorage.getItem('role')

const empresa = ref<EnterpriseType | null>(null)

const carregando = ref(true)

const erro = ref<string | null>(null)

const mostrarFormulario = ref(false);

const optionsRegime = [
    { text: 'Mei', value: 'MEI' },
    { text: 'Simples Nacional', value: 'SIMPLES_NACIONAL' },
    { text: 'Lucro Real', value: 'LUCRO_REAL' },
    { text: 'Lucro Presumido', value: 'LUCRO_PRESUMIDO' },
]

const optionsAtividade = [
    { text: 'Industrial', value: 'INDUSTRIAL' },
    { text: 'Serviço', value: 'SERVICO' },
    { text: 'Comercio', value: 'COMERCIO' },
    { text: 'Financeira', value: 'FINANCEIRA' },
    { text: 'Imobiliária', value: 'IMOBILIARIA' }
]

const optionsNatureza = [
    { text: 'Empresario Individual', value: 'EMPRESARIO_INDIVIDUAL' },
    { text: 'Eireli', value: 'EIRELI' },
    { text: 'LTDA', value: 'SOCIEDADE_EMPRESARIA_LIMITADA' },
    { text: 'Sociedade Anonima', value: 'SOCIEDADE_ANONIMA' },
    { text: 'Sociedade Simples', value: 'SOCIEDADE_SIMPLES' }
]

const empresaForm = ref({
    descricao: '',
    cnpj: '',
    empresaTiposAtividade: 'INDUSTRIAL',
    empresaRegimeTributario: 'MEI',
    empresaNaturezaPessoa: 'EMPRESARIO_INDIVIDUAL',
    status: 'true'
});

const formatarCnpj = (e: Event) => {
  const input = e.target as HTMLInputElement;
  let valor = input.value;

  valor = valor.replace(/\D/g, ''); 

  if (valor.length > 2)  valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
  if (valor.length > 5)  valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  if (valor.length > 8)  valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
  if (valor.length > 12) valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
  
  empresaForm.value.cnpj = valor;
};

onMounted(async () => {
    try {
        const data = await buscarEmpresaAtual();

        empresa.value = {
            descricao: data.descricao ?? "Não foi possível buscar os dados",
            empresaTiposAtividade: data.empresaTiposAtividade ?? 'Não informado',
            empresaRegimeTributario: data.empresaRegimeTributario ?? 'Não informado',
            empresaNaturezaPessoa: data.empresaNaturezaPessoa ?? 'Não informado',
            status: data.status ?? 'Não informado'
        };
    } catch (e) {
        erro.value = "Não foi possível carregar os dados da empresa.;"
    } finally {
        carregando.value = false
    }
})

const campos = computed(() => [
    { label: 'Descrição', valor: empresa.value?.descricao ?? '—' },
    { label: 'Tipo de atividade', valor: empresa.value?.empresaTiposAtividade ?? '—' },
    { label: 'Regime tributário', valor: empresa.value?.empresaRegimeTributario ?? '—' },
    { label: 'Natureza da pessoa', valor: empresa.value?.empresaNaturezaPessoa ?? '—' },
    { label: 'Status', valor: empresa.value?.status ?? '—' }
]);

function alternarFormulario() {
    mostrarFormulario.value = !mostrarFormulario.value;
}

const salvarEmpresa = async () => {

    const cnpjLimpo = empresaForm.value.cnpj.replace(/\D/g, '');

    const payload = {
        ...toRaw(empresaForm.value),
        cnpj: cnpjLimpo
    }

    await criarEmpresa(payload);

    mostrarFormulario.value = false;
}

</script>

<template>
    <div class="empresaDiv" v-if="role !== 'DONO'">
        <div v-if="carregando" class="estado">
            <p>Carregando dados da empresa...</p>
        </div>

        <div v-else-if="erro" class="estado erro">
            <p>{{ erro }}</p>
        </div>

        <div v-else class="conteudo">
            <div class="header">
                <div>
                    <span class="eyebrow">Dados da empresa</span>
                    <h2>Perfil institucional</h2>
                </div>
            </div>

            <p class="descricao">{{ empresa?.descricao }}</p>

            <div class="grid">
                <div v-for="campo in campos" :key="campo.label" class="info-card">
                    <span>{{ campo.label }}</span>
                    <strong>{{ campo.valor }}</strong>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="empresaDiv dono">
        <div v-if="carregando" class="estado">
            <p>Carregando dados da empresa...</p>
        </div>

        <div v-else-if="erro" class="estado erro">
            <p>{{ erro }}</p>
        </div>

        <div v-else class="conteudo dono-content">
            <div class="header">
                <div>
                    <span class="eyebrow">Dados da empresa atual</span>
                    <h2>Perfil institucional</h2>
                </div>

                <button type="button" class="btn-adicionar" @click="alternarFormulario">
                    {{ mostrarFormulario ? 'Cancelar' : 'Adicionar empresa' }}
                </button>
            </div>

            <p class="descricao">{{ empresa?.descricao }}</p>

            <div v-show="mostrarFormulario === false" class="grid">
                <div v-for="campo in campos" :key="campo.label" class="info-card">
                    <span>{{ campo.label }}</span>
                    <strong>{{ campo.valor }}</strong>
                </div>
            </div>

            <div v-if="mostrarFormulario" class="formulario">
                <div class="form-header">
                    <h3>Cadastrar nova empresa</h3>
                </div>

                <div class="form-grid">
                    <label>
                        <span>Descrição</span>
                        <input v-model="empresaForm.descricao" type="text" placeholder="Ex: ERP Financeira" />
                    </label>

                    <label>
                        <span>Cnpj</span>
                        <input v-model="empresaForm.cnpj" type="text" placeholder="Cnpj Da Empresa" @input="formatarCnpj" 
                        pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}" maxlength="18" autocomplete="off" />
                    </label>

                    <label>
                        <span>Tipo de Atividade</span>
                        <select v-model="empresaForm.empresaTiposAtividade" class="selectOptions">
                            <option v-for="option in optionsAtividade" :key="option.value" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </label>

                    <label>
                        <span>Regime tributário</span>
                        <select v-model="empresaForm.empresaRegimeTributario" class="selectOptions">
                            <option value="" disabled>Selecione um regime...</option>
                            <option v-for="option in optionsRegime" :key="option.value" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </label>

                    <label>
                        <span>Natureza Da Pessoa</span>
                        <select v-model="empresaForm.empresaNaturezaPessoa" class="selectOptions">
                            <option v-for="option in optionsNatureza" :key="option.value" :value="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </label>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-secundario" @click="mostrarFormulario = false">
                        Fechar
                    </button>
                    <button type="button" class="btn-primary" @click="salvarEmpresa">
                        Salvar empresa
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.empresaDiv {
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

.empresaDiv.dono {
    gap: 16px;
}

.conteudo {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.dono-content {
    width: 100%;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
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

.descricao {
    color: var(--ph-color);
    font-size: 1rem;
    line-height: 1.6;
    max-width: 800px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(220px, 1fr));
    gap: 15px;
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

.info-card span {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ph-color);
    opacity: 0.7;
}

.info-card strong {
    color: var(--option-color);
    font-size: 1.15rem;
    line-height: 1.4;
}

.btn-adicionar,
.btn-primary,
.btn-secundario {
    border: none;
    border-radius: 12px;
    padding: 12px 18px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

.btn-adicionar,
.btn-primary {
    background: var(--option-color);
    color: var(--primary-background-color);
}

.btn-secundario {
    background: var(--secondary-background-color);
    border: 1px solid var(--third-background-color);
    color: var(--option-color);
}

.btn-adicionar:hover,
.btn-primary:hover,
.btn-secundario:hover {
    opacity: 0.92;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 8px;
    padding: 24px;
    border-radius: 18px;
    border: 1px solid var(--third-background-color);
    background: var(--secondary-background-color);
}

.form-header h3 {
    color: var(--option-color);
    font-size: 1.3rem;
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

input {
    width: 100%;
    border: 1px solid var(--third-background-color);
    background: var(--primary-background-color);
    color: var(--option-color);
    border-radius: 10px;
    padding: 12px 14px;
    font: inherit;
}

input:focus {
    outline: 2px solid rgba(0, 0, 0, 0.08);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.estado {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: var(--ph-color);
}

.estado.erro {
    color: #9d2a2a;
}
</style>