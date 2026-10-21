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

const formatarCnpj = (e: Event) => {
  const input = e.target as HTMLInputElement;
  let valor = input.value;

  valor = valor.replace(/\D/g, ''); 

  if (valor.length > 2)  valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
  if (valor.length > 5)  valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  if (valor.length > 8)  valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
  if (valor.length > 12) valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
  
  formData.cnpj = valor;
};

const options = ref(["Dono", "Administrador Do Sistema", "Analista de Contas a Pagar", "Analista de Contas a Receber", "Consultor"])

const optionSelected = ref("Consultor");

const handleLogin = async () => {
  const tempFormData = {
    ...formData,
    cnpj: formData.cnpj.replace(/\D/g, ''),
  }
  login(tempFormData)
}

</script>

<template>
  <form class="loginForm" @submit.prevent="handleLogin">
    <div class="loginDiv">
      <h1>Entre na sua Conta</h1>
      <select id="selectOptions" v-model="optionSelected">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <input class="loginInputs" :type="firstInputType" :value="formData.cnpj" @input="formatarCnpj" pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
        placeholder="Digite o cnpj da Empresa: " maxlength="18" autocomplete="off"
        required>
      <input class="loginInputs" :type="secondInputType" v-model="formData.email" placeholder="Digite seu Email: "
        required>
      <input class="loginInputs" :type="thridInputType" v-model="formData.senha" placeholder="Digite sua Senha: "
        required>
      <button class="buttonLogin">{{ text }}</button>
    </div>
  </form>
</template>

<style scoped>
.loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.loginDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw;
  height: 60vh;
  background-color: var(--secondary-background-color);
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

select {
  width: 80%;
  height: 40px;
  margin-top: 60px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  padding: 0 10px;
}

.loginInputs {
  width: 80%;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  padding: 0 10px;
}

.buttonLogin {
  width: 80%;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: var(--button-color);
  color: var(--option-color);
  font-size: 16px;
  cursor: pointer;
}

.buttonLogin:hover {
  background-color: var(--option-color);
  color: var(--button-color);
}

</style>