<script lang="ts" setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import DashboardDiv from '../components/DashboardDiv.vue';
</script>

<template>
    <div class="app-layout">

        <Sidebar class="app-sidebar" />

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