import axios from '../../DB/axios.js';

export default {
    namespaced: true,
    state() {
        return {
            users: [
                {
                    userId: '',
                    username: '',
                    fullname: '',
                    emailAddress: '',
                    following: [],
                    followers: [],
                    dateCreated: Date.now(),
                },
            ],
        };
    },
    getters: {},
    actions: {
        loadUsers(context) {},
        /** Save a new user from signup */
        async saveUser(context, { username, fullname, emailAddress }) {
            // get userId and token from auth store
            const userId = context.rootGetters.userId;
            const token = context.rootGetters.token;

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
                const res = await axios.put(`/users/${userId}.json?auth=${token}`, {
                    ...newUser,
                });
                console.log('saved user');
                console.dir('res');
            } catch (error) {
                throw new Error(error.message);
            }
        },
    },
    mutations: {},
};
