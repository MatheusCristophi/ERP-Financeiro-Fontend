<script lang="ts" setup>

import { ref } from 'vue'
import { logout } from '../api/Api';

const menuItems = [
  'Dashboard',
  'Empresa',
  'Conta',
  'Lancamento',
  'Pessoa',
  'Categoria',
  'Configuracao'
];

const emit = defineEmits<{
  (e: 'telaTrocada', novaTela: string):void
}>()

const botaoEscolhido = ref('Dashboard');

function selecionarBotao(selecao:string) {
  botaoEscolhido.value = selecao

  emit('telaTrocada', selecao)
}

console.log(botaoEscolhido)

</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in menuItems" :key="item" class="nav-item">
          <button type="button" class="nav-button" @click="selecionarBotao(item)">
            {{ item }}
          </button>
        </li>
        <button type="button" class="btn-logout" @click="logout">
            Sair
        </button>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
    height: 100vh;
    width: 100%;
    min-width: 220px;
    background-color: var(--secondary-background-color);
    border-right: 2px solid var(--third-background-color);
}

.sidebar-nav {
  width: 100%;
}

.btn-logout {
  position: absolute;
  align-self: center;
  background-color: var(--secondary-background-color);
  border-radius: 10px;
  border: 2px solid var(--third-background-color);
  bottom: 20px;
  width: 100px;
  height: 40px;
}

.btn-logout:hover {
  cursor: pointer;
  background-color: var(--third-background-color);
}

.sidebar-nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.settings-button{
    border-radius: 10px;
    width: 90%;
    margin-top: 50px;
}

.nav-button {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--sidebar-text);
  text-align: center;
  padding: 14px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.nav-button:hover {
  background: var(--sidebar-hover);
  transform: translateX(2px);
}

</style>
