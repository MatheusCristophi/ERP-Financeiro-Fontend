<script lang="ts" setup>

defineProps <{
    text: string
}>();

</script>

<template>
    <div class="headerDiv">
        <h1 class="headerH1">ERP FINANCE</h1>
        <p class="headerP">{{ text }}</p>
    </div>
</template>

<style scoped>
    .headerDiv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        min-height: 70px;
        background-color: var(--primary-background-color);
        margin: 0;
        padding: 0;
    }

    .headerH1 {
        margin-left: 70px;
        color: var(--h1-text-color);
        font-size: 20px;
    }

    .headerP {
        height: 30px;
        margin-right: 70px;
        color: var(--p-text-color);
        align-content: center;
        font-size: larger;
    }
</style>