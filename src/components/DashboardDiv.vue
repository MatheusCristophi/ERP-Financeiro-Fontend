<script lang="ts" setup>
import { computed, ref } from 'vue';

const role = computed<string>(
    () => localStorage.getItem('role') || ''
);



</script>

<template>
    <div v-if="role === 'DONO'" class="dashboardDono">
        <div class="despRect">
            <h1>Despesas e Receitas</h1>
            <svg class="despRectGrafico"></svg>
        </div>
        <div class="produto">
            <h1>Produtos Mais Vendidos</h1>
            <svg class="produtoGrafico"></svg>
        </div>
        <div>
        </div>
        <div>
        </div>
    </div>

    <div v-else-if="role === 'ADMINISTRADOR_DO_SISTEMA'" class="dashboardDono">

    </div>

    <div v-else-if="role === 'CONSULTOR'" class="dashboardDono">

    </div>

    <div v-else-if="role === 'CONSULTOR'" class="dashboardDono">

    </div>

    <div v-else class="dashboardInvalido">
        <p>Esta carregando os dados ou o usuário não possuí permissão para acessar o dashboard.</p>
    </div>
</template>

<style scoped>

.dashboardDono {
    display: flex;
    flex-wrap: wrap;
    justify-self: center;
    align-self: center;
    padding: 30px;
    width: 100%;
    height: 95vh;
    gap: 20px;

    .despRect, .produto {
        justify-self: center;
        align-content: center;
        border: 2px solid var(--third-background-color);
        border-radius: 20px;
        height: 350px;
        color: var(--ph-color);
        font-size: small;
        text-align: center;
        flex: 1 1 calc(50% - 16px);
    }
}

.despRectGrafico, .produtoGrafico {
    width: 90%;
    height: 70%;
}

.dashboardInvalido {
    display: flex;
    justify-self: center;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 60vw;
    height: 100%;
    margin: 200px;
    border: 2px solid var(--third-background-color);
    border-radius: 20px;
}
</style>