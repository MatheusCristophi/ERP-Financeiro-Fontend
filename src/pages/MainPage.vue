<script lang="ts" setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import DashboardDiv from '../components/DashboardDiv.vue';
import EmpresaDiv from '../components/EmpresaDiv.vue';
import ContaDiv from '../components/ContaDiv.vue';
import LancamentoDiv from '../components/LancamentoDiv.vue';
import { ref } from 'vue';

const telaAtual = ref('Dashboard');

function atualizarTela(novaTela: string) {
    telaAtual.value = novaTela;
}
</script>

<template>
    <div class="app-layout">
        <Sidebar @tela-trocada="atualizarTela" class="app-sidebar" />
        <div class="main-container">
            <Header class="app-header" />
            <main class="app-content">
                <DashboardDiv v-if="telaAtual === 'Dashboard'" />
                <EmpresaDiv v-else-if="telaAtual === 'Empresa'" />
                <ContaDiv v-else-if="telaAtual === 'Conta'" />
                <LancamentoDiv v-else-if="telaAtual === 'Lancamento'" />
                <PessoaDiv v-else-if="telaAtual === 'Pessoa'" />
                <CategoriaDiv v-else-if="telaAtual === 'Categoria'" />
            </main>
        </div>
    </div>
</template>

<style scoped>
.app-layout {
    display: flex;
    height: 100vh;
    width: 100vw;
    max-width: 100vw;
    overflow: hidden;
}

.app-sidebar {
    display: flex;
    flex-direction: column;
    width: 250px;
    min-width: 220px;
    flex-shrink: 0;
    height: 100%;
}

.main-container {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    overflow: hidden;
}

.app-header {
    width: 100%;
    flex-shrink: 0;
}

.app-content {
    flex: 1;
    overflow-y: auto;
}
</style>
