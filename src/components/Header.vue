<script lang="ts" setup>
const nome = localStorage.getItem('nome')
</script>

<template>
    <div class="headerDiv">
        <h1 class="headerH1">ERP FINANCE</h1>
        <p class="headerP">Bem vindo ao sistema, {{ nome }}</p>
    </div>
</template>

<style scoped>
    .headerDiv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        min-height: 70px;
        background-color: var(--secondary-background-color);
        border-bottom: 2px solid var(--third-background-color);
        margin: 0;
        padding: 0 24px;
        gap: 16px;
        box-sizing: border-box;
    }

    .headerH1 {
        margin-left: 0;
        color: var(--h1-text-color);
        font-size: 20px;
        white-space: nowrap;
    }

    .headerP {
        height: auto;
        margin-right: 0;
        color: var(--p-text-color);
        align-content: center;
        font-size: larger;
        text-align: right;
        white-space: nowrap;
    }
</style>