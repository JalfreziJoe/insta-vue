<template>
    <header class="h-16 bg-white border-b mb-8">
        <div class="container mx-auto max-width-lg h-full">
            <div class="flex justify-between h-full">
                <div class="text-gray-700 text-center flex items-center align-items cursor-pointer">
                    <h1>
                        <router-link to="/" aria-label="Dashboard">
                            <img
                                src="../assets/images/logo.png"
                                alt="Instagram"
                                class="mt-2 w-6/12"
                            />
                        </router-link>
                    </h1>
                </div>
                <div class="text-gray text-center flex items-center align-items">
                    <div
                        v-if="isLoggedIn"
                        class="text-gray text-center flex items-center align-items"
                    >
                        <router-link to="/" arial-label="Home">
                            <svg
                                class="w-8 mr-6 text-black-light cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="{2}"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </router-link>

                        <button type="button" title="Sign Out" @Click="logout">
                            <svg
                                class="w-8 mr-6 text-black-light cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="{2}"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                        <div v-if="userLoaded" class="flex items-center cursor-pointer">
                            <router-link :to="'/p/' + username">
                                <img
                                    class="rounded-full h-8 w-8 flex"
                                    :src="'/assets/images/avatars/' + username + '.jpg'"
                                    :alt="username + ' profile picture'"
                                />
                            </router-link>
                        </div>
                    </div>
                    <div v-else>
                        <router-link to="/login">
                            <button
                                type="button"
                                class="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
                            >
                                Log In
                            </button>
                        </router-link>
                        <router-link to="/signup">
                            <button
                                type="button"
                                class="font-bold text-sm rounded text-blue w-20 h-8"
                            >
                                Sign Up
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        function logout() {
            //console.log('logout');
            store.dispatch('clearAuth');
            router.replace('/login');
        }
        const isLoggedIn = computed(() => {
            //console.log('isLoggedIn');
            return useStore().getters['isAuthenticated'];
        });
        const userLoaded = computed(() => {
            return useStore().getters['users/isUserLoaded'];
        });

        //console.log(isLoggedIn);
        // if (isLoggedIn) {
        //     useStore().dispatch('users/loadUser');
        // }

        const username = computed(() => {
            return useStore().getters['users/username'];
        });

        return {
            logout,
            isLoggedIn,
            username,
            logout,
            userLoaded,
        };
    },
};
</script>
