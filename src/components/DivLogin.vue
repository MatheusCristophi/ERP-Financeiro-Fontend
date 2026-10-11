<script lang="ts" setup>

import { reactive, ref } from 'vue'
import { login } from '../api/Api';
import type { AuthType } from '../types/AuthType';

defineProps<{
    firstInputType: string;
    secondInputType: string;
    thridInputType: string;
    text: string;
}>();

const formData = reactive<AuthType>({
    cnpj: '',
    email: '',
    senha: ''
});

const options = ref(["Dono", "Administrador Do Sistema", "Analista de Contas a Pagar", "Analista de Contas a Receber", "Consultor"])

const optionSelected = ref("Consultor");

const handleLogin = async () => {
    login(formData)
}

</script>

<template>
    <form class="loginForm" @submit.prevent="handleLogin">
        <h1>Entre na sua Conta</h1>
        <select class="loginInputs" id="selectOptions" v-model="optionSelected">
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
        <input class="loginInputs" :type="firstInputType" v-model="formData.cnpj" placeholder="Digite o cnpj da Empresa: " required>
        <input class="loginInputs" :type="secondInputType" v-model="formData.email" placeholder="Digite seu Email: " required>
        <input class="loginInputs" :type="thridInputType" v-model="formData.senha" placeholder="Digite sua Senha: " required>
        <button class="buttonLogin">{{ text }}</button>
    </form>
</template>

<style scoped>
    .loginForm {
        background-color: var(--secundary-background-color);
        height: 70vh;
        margin-top: 15vh;
        border: 1px solid black;
        width: 50vw;
        justify-self: center;
        align-self: center;
        display: flex;
        gap: 50px;
        flex-direction: column;
        
        h1 {
            text-align: center;
            padding-top: 30px;
        }

        .loginInputs {
            width: 80%;
            height: 60px;
            align-self: center;
            color: var(--option-color);
            background-color: var(--shadow-background-color);
            padding-left: 30px;
            border: 1px solid black;
            font-size: larger;
        }
    }
        
    .buttonLogin {
        width: 30%;
        height: 40px;
        border: 1px solid black;
        align-self: center;
        background-color: var(--third-background-color);
        color: var(--option-color);
        border-radius: 10px;
    }

    .buttonLogin:hover {
        background-color: var(--shadow-background-color);
        cursor: pointer;
    }
</style>