import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$formatDate = (date: Date | string | null | undefined) => {
    if (!date) return '';

    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) return ''; // Evita erro se a string for inválida

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(dateObj);
}

app.use(pinia)
app.use(router)

.mount('#app')
