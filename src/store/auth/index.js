import * as fb from '../../hooks/useFirebase.js';

let expiryTimer;

export default {
    state() {
        return {
            userId: null,
        };
    },
    actions: {
        async auth(context, payload) {
            try {
                let res;
                if (payload.mode === 'login') {
                    res = await fb.auth.signInWithEmailAndPassword(payload.email, payload.password);
                } else {
                    res = await fb.auth.createUserWithEmailAndPassword(
                        payload.email,
                        payload.password
                    );
                }
                // // setup session expiry in miliseconds
                // const sessionExpiry = +res.data.expiresIn * 1000;
                // // set a date in miliseconds in the future for the token to expire
                // const expiryDate = sessionExpiry + new Date().getTime();

                // // add session to localstorage
                // localStorage.setItem('token', res.data.idToken);
                // localStorage.setItem('userId', res.data.localId);
                // localStorage.setItem('tokenExpiry', expiryDate);

                // // timer set whilst in app to autologout
                // expiryTimer = setTimeout(function () {
                //     context.dispatch('autoLogout');
                // }, sessionExpiry);

                context.commit('setUser', {
                    userId: res.user.uid,
                });
            } catch (error) {
                const code = error.code;
                let msg;
                switch (code) {
                    case 'auth/email-already-in-use':
                        throw new Error('Email already taken.');
                    case 'auth/invalid-email':
                        throw new Error('Invalid email, please try again');
                    case 'auth/user-disabled':
                        throw new Error('User disabled');
                    case 'auth/user-not-found':
                        throw new Error('Please signup first');
                    case 'auth/wrong-password':
                        throw new Error('Could not authenticate. Please try again');
                }
            }
        },
        storeLogin(context, payload) {
            //console.log('auth checkLogin');

            context.commit('setUser', { userId: payload.userId });

            //context.dispatch('users/loadUser');
        },
        clearAuth(context) {
            //console.log('clearAuth');

            fb.auth.signOut();

            context.commit('setUser', {
                userId: null,
            });
        },
        autoLogout(context) {
            context.dispatch('clearAuth');
        },
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        isAuthenticated(state) {
            //console.log('isAuthenticated');
            return !!state.userId;
        },
    },
    mutations: {
        setUser(state, payload) {
            //console.log('auth mutations setUser');

            state.userId = payload.userId;
        },
    },
};
