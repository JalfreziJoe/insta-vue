<template>
    <div class="container flex mx-auto max-w-screen-md items-center h-screen">
        <div class="flex w-3/5">
            <img src="../assets/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
        </div>
        <div class="flex flex-col w-2/5">
            <div class="flex flex-col items-center bg-white p-4 border mb-4">
                <h1 class="flex justify-center w-full">
                    <img src="../assets/images/logo.png" alt="Instagram" class="mt-2 w-6/12 mb-4" />
                </h1>
                <p v-if="!!error" className="mb-4 text-xs text-red-500">{{ error }}</p>
                <form @submit.prevent="onSubmit">
                    <input
                        aria-label="Enter your email address"
                        class="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                        type="text"
                        placeholder="Email address"
                        v-model.trim="email"
                    />
                    <input
                        aria-label="Enter your password"
                        class="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                        type="password"
                        placeholder="Password"
                        v-model.trim="password"
                    />
                    <button
                        :disabled="isInvalid"
                        type="submit"
                        class="bg-blue-500 text-white w-full rounded h-8 font-bold"
                        :class="{ 'cursor-not-allowed opacity-50': isInvalid }"
                    >
                        Log In
                    </button>
                </form>
            </div>
            <div class="flex justify-center items-center flex-col w-full bg-white p-4 border">
                <p class="text-sm">
                    Don't have an account?
                    <router-link to="/signup" class="font-bold"> Sign up </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const store = useStore();
        const email = ref('');
        const password = ref('');
        const error = ref(null);
        const router = useRouter();

        const isInvalid = computed(() => {
            return email.value === '' || password.value === '';
        });

        const onSubmit = async () => {
            error.value = null;
            if (!email.value.includes('@')) {
                error.value = 'Please enter a valid email address';
                return;
            }
            try {
                const res = await store.dispatch('auth', {
                    mode: 'login',
                    email: email.value,
                    password: password.value,
                });
                console.log('login success');
                await store.dispatch('users/loadUser', { uid: store.getters.userId });
                router.replace('/');
            } catch (err) {
                error.value = err.message;
            }
        };

        return {
            email,
            password,
            error,
            isInvalid,
            onSubmit,
        };
    },
};
</script>
