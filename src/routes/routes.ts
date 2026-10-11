import type { RouteRecordRaw } from "vue-router";
import LoginPage from "../pages/loginPage.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: LoginPage
    }
]