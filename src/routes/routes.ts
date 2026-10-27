import type { RouteRecordRaw } from "vue-router";
import LoginPage from "../pages/loginPage.vue";
import MainPage from "../pages/MainPage.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/main',
        name: 'main',
        component: MainPage,
        meta: {requiresAuth: true}
    },
    { 
        path: '/:pathMatch(.*)*', 
        redirect: '/login', 
    }
]