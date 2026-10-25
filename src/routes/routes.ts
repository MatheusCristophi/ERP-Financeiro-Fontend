import type { RouteRecordRaw } from "vue-router";
import LoginPage from "../pages/loginPage.vue";
import MainPage from "../pages/MainPage.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        component: LoginPage,    
    },
    {
        path: '/main',
        component: MainPage,
    },
    { 
        path: '/:pathMatch(.*)*', 
        redirect: '/login', 
    }
]