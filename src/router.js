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
        { path: '/login', component: Login },
        { path: '/signup', component: Signup },
        { path: '/p/:username', component: Profile },
        { path: '/:notfound(.*)', component: NotFound },
    ],
});

export default router;
