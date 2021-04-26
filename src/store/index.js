import { createStore } from 'vuex';
import authModule from './auth/index.js';
import usersModule from './users/index.js';
import photosModule from './photos/index.js';

const store = createStore({
    modules: {
        auth: authModule,
        users: usersModule,
        photos: photosModule,
    },
});

export default store;
