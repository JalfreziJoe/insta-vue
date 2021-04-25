import { createRouter, createWebHistory } from 'vue-router';

import Login from './pages/TheLogin.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
    ],
});

export default router;
