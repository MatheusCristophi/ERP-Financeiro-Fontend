<script lang="ts" setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import EmpresaDiv from '../components/EmpresaDiv.vue';
import DashboardDiv from '../components/DashboardDiv.vue';
import { ref } from 'vue'

const telaAtual = ref('Dashboard');

function atualizarTela(novaTela:string) {
    telaAtual.value = novaTela
}

</script>

<template>
    <div class="app-layout" v-if="telaAtual === 'Dashboard'">
        <Sidebar @tela-trocada="atualizarTela" class="app-sidebar" />
        <div class="main-container">
            <Header class="app-header" />
            <main>
                <DashboardDiv />
            </main>
        </div>

    </div>
    <div class="app-layout" v-if="telaAtual === 'Empresa'">
        <Sidebar @tela-trocada="atualizarTela" class="app-sidebar" />
        <div class="main-container">
            <Header class="app-header" />

            <main>
                <EmpresaDiv />
            </main>
        </div>

    </div>
    <div class="app-layout" v-if="telaAtual === 'Conta'">
        <Sidebar @tela-trocada="atualizarTela" class="app-sidebar" />
        <div class="main-container">
            <Header class="app-header" />

            <main>
                <DashboardDiv />
            </main>
        </div>

    </div>
    <div class="app-layout" v-if="telaAtual === 'Lancamento'">
        <Sidebar @tela-trocada="atualizarTela" class="app-sidebar" />
        <div class="main-container">
            <Header class="app-header" />

            <main>
                <DashboardDiv />
            </main>
        </div>

    </div>
    <div class="app-layout" v-if="telaAtual === 'Pessoa'">
        <Sidebar @tela-trocada="atualizarTela" class="app-sidebar" />
        <div class="main-container">
            <Header class="app-header" />

            <main>
                <DashboardDiv />
            </main>
        </div>

    </div>
    <div class="app-layout" v-if="telaAtual === 'Categoria'">
        <Sidebar @tela-trocada="atualizarTela" class="app-sidebar" />
        <div class="main-container">
            <Header class="app-header" />

            <main>
                <DashboardDiv />
            </main>
        </div>

    </div>
    <div class="app-layout" v-if="telaAtual === 'Configuracao'">
        <Sidebar @tela-trocada="atualizarTela" class="app-sidebar" />
        <div class="main-container">
            <Header class="app-header" />

            <main>
                <DashboardDiv />
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
}

.app-header {
  width: 100%;
  flex-shrink: 0;
}

</style>