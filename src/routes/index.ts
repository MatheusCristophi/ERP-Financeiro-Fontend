import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuthStore } from '../store/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if(!auth.carregada) await auth.carregarSessao();

  if(to.meta.requiresAuth && !auth.autenticado) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  const rolesPermitidas = to.meta.roles as string[] | undefined

  if(rolesPermitidas && !rolesPermitidas.includes(auth.role ?? '')) {
    return { name: 'main' }
  }
})

export default router