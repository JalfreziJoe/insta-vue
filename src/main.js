import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';
import './index.css';

//firebase
import { auth } from './hooks/useFirebase.js';

//import seed from './seed.js';

//seed();

let app;
auth.onAuthStateChanged(user => {
    if (!app) {
        app = createApp(App);
        app.use(store);
        app.use(router);
        app.mount('#app');
    }
    if (user) {
        store.dispatch('storeLogin', { userId: user.uid });
        store.dispatch('users/loadUser', user);
    }
});
