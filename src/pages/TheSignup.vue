<template>
    <div class="container flex mx-auto max-w-xs items-center h-screen">
        <div class="flex flex-col">
            <div class="flex flex-col items-center bg-white p-4 border mb-4">
                <h1 class="flex justify-center w-full">
                    <img src="../assets/images/logo.png" alt="Instagram" class="mt-2 w-6/12 mb-4" />
                </h1>
                <p v-if="!!error" class="mb-4 text-xs text-red-500 text-center">{{ error }}</p>
                <!-- error -->

                <form @submit.prevent="onSubmit">
                    <input
                        aria-label="Enter your username"
                        class="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                        type="text"
                        placeholder="Username"
                        v-model="username"
                    />
                    <input
                        aria-label="Enter your full name"
                        class="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                        type="text"
                        placeholder="Full name"
                        v-model="fullname"
                    />
                    <input
                        aria-label="Enter your email address"
                        class="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                        type="text"
                        placeholder="Email address"
                        v-model="email"
                    />
                    <input
                        aria-label="Enter your password"
                        class="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                    />
                    <button
                        :disabled="isInvalid"
                        type="submit"
                        class="bg-blue-500 text-white w-full rounded h-8 font-bold"
                        :class="{ 'cursor-not-allowed opacity-50': isInvalid }"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            <div class="flex justify-center items-center flex-col w-full bg-white p-4 border">
                <p class="text-sm">
                    Have an account?
                    <router-link to="/login" class="font-bold text-blue"> Login </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
export default {
    setup() {
        const username = ref('');
        const fullname = ref('');
        const email = ref('');
        const password = ref('');
        const error = ref(null);

        const store = useStore();
        const router = useRouter();

        const isInvalid = computed(() => {
            return (
                username.value === '' ||
                fullname.value === '' ||
                email.value === '' ||
                password.value === ''
            );
        });

        const onSubmit = async () => {
            error.value = null;
            console.log(`username: ${username.value}`);
            console.log(`fullname: ${fullname.value}`);
            console.log(`email: ${email.value}`);
            console.log(`password: ${password.value}`);
            if (!email.value.includes('@')) {
                error.value = 'Please enter a valid email address.';
                return;
            }
            try {
                await store.dispatch('auth', {
                    mode: 'signup',
                    email: email.value,
                    password: password.value,
                });
                console.log('sign up success: ' + store.getters.userId);
                // add new user to db
                await store.dispatch('users/saveUser', {
                    username: username.value,
                    fullname: fullname.value,
                    emailAddress: email.value,
                });
                router.replace('/');
            } catch (err) {
                error.value = err.message;
            }
        };

        return {
            username,
            fullname,
            email,
            password,
            isInvalid,
            onSubmit,
            error,
        };
    },
};
</script>
