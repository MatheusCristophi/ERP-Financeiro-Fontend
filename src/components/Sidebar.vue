<script lang="ts" setup>
const menuItems = [
  'Empresa',
  'Conta',
  'Lançamento',
  'Pessoa',
  'Categoria',
];
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in menuItems" :key="item" class="nav-item">
          <button type="button" class="nav-button">
            {{ item }}
          </button>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer">
      <button type="button" class="nav-button settings-button">
        Configurações
      </button>
    </div>
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

.sidebar-nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.nav-item {
  width: 100%;
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
