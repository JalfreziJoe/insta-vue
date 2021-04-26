import axios from '../../DB/axios.js';

export default {
    state() {
        return {
            token: null,
            userId: null,
        };
    },
    actions: {
        async auth(context, payload) {
            let url =
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                import.meta.env.VITE_APP_FIREBASE_API;

            if (payload.mode === 'signup') {
                url =
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
                    import.meta.env.VITE_APP_FIREBASE_API;
            }
            try {
                const res = await axios.post(url, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });
                console.log(res.data.idToken);
                context.commit('setUser', {
                    token: res.data.idToken,
                    userId: res.data.localId,
                });
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        token(state) {
            return state.token;
        },
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
        },
    },
};
