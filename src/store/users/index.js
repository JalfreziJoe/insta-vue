import * as fb from '../../hooks/useFirebase.js';

export default {
    namespaced: true,
    state() {
        return {
            user: {
                userId: '',
                username: '',
                fullname: '',
                emailAddress: '',
                following: [],
                followers: [],
                dateCreated: Date.now(),
            },
            userLoaded: false,
        };
    },
    getters: {
        username(state) {
            //console.log('users getters username');
            //console.log(state.user.username);
            return state.user.username;
        },
        following(state) {
            return state.user.following;
        },
        fullname(state) {
            return state.user.fullname;
        },
        isUserLoaded(state) {
            //console.log('userloaded:', state.userLoaded);
            return state.userLoaded;
        },
    },
    actions: {
        async loadUser(context, payload) {
            //console.log('actions loadUser');
            context.commit('setUser', payload.uid, null, { root: true });
            // if (context.getters.username !== '') {
            //     console.log('user already loaded');
            //     return;
            // }
            //const userId = context.rootGetters.userId;
            //console.log(payload.uid);
            try {
                const res = await fb.usersCollection.doc(payload.uid).get();
                if (!res.exists) {
                    throw new Error('Error getting user');
                }
                //console.log(res.data());

                context.commit('setUser', res.data());
                context.commit('setUserLoaded');
            } catch (err) {
                //console.log('loadUser error');
                throw new Error(err.message);
            }
        },
        /** Save a new user from signup */
        async saveUser(context, { username, fullname, emailAddress }) {
            // get userId and token from auth store
            const userId = context.rootGetters.userId;
            //const token = context.rootGetters.token;

            // generate new user object
            const newUser = {
                username,
                fullname,
                emailAddress,
                userId,
                following: [],
                followers: [],
                dateCreated: Date.now(),
            };
            try {
                // put new user to firebase
                const res = fb.usersCollection.doc(userId).set({
                    ...newUser,
                });
                //console.log('saved user');
                console.dir(res.data);
            } catch (error) {
                throw new Error(error.message);
            }
        },
        /** checks current user has an entry in users and add an entry if necessary */
        // async checkUser(context) {
        //     const userId = context.rootGetters.userId;
        //     const token = context.rootGetters.token;
        //     try {
        //         const res = await axios.get(`/users/${userId}.json?auth=${token}`);
        //         console.log(res.data);
        //         if (!res.data) {
        //             await context.commit('saveUser' {username: })
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
    },
    mutations: {
        setUser(state, payload) {
            //console.log('user mutations setuser');
            state.user = payload;
        },
        setUserLoaded(state) {
            state.userLoaded = true;
        },
    },
};
