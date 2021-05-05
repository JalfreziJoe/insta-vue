import store from './store/index.js';
import { createRouter, createWebHistory } from 'vue-router';

import Login from './pages/TheLogin.vue';
import Signup from './pages/TheSignup.vue';
import Dashboard from './pages/TheDashboard.vue';
import Profile from './pages/TheProfile.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Dashboard },
        { path: '/login', component: Login, meta: { requiresUnAuth: true } },
        { path: '/signup', component: Signup, meta: { requiresUnAuth: true } },
        { path: '/p/:username', component: Profile, meta: { requiresAuth: true } },
        { path: '/:notfound(.*)', component: NotFound },
    ],
});

router.beforeEach((to, _, next) => {
    if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
        next('/');
    } else if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('login');
    } else {
        next();
    }
});

export default router;
