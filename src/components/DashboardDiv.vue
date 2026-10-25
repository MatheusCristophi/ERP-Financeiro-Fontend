<script lang="ts" setup>
import { computed } from 'vue';


const role = computed<string>(
    () => localStorage.getItem('role') || ''
);

const saldoMensal = computed<number>(
    () => (0)
);

const saldoAnual = computed<number>(
    () => (0)
);

</script>

<template>
    <div v-if="role === 'DONO'" class="dashboardDono">
        <div class="saldo">
            <h1>Despesas e Receitas Mensais</h1>
            <h1>{{ saldoMensal }}</h1>
        </div>
        <div class="saldo">
            <h1>Despesas e Receitas Anuais</h1>
            <h1>{{ saldoAnual }}</h1>
        </div>      
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

    .saldo {
        justify-self: center;
        align-content: center;
        border: 2px solid var(--third-background-color);
        border-radius: 20px;
        height: 200px;
        color: var(--ph-color);
        font-size: small;
        text-align: center;
        flex: 1 1 calc(50% - 16px);
    }
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