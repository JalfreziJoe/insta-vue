<template>
    <div class="bg-gray" v-if="doesExist">
        <the-header />
        <div class="mx-auto max-w-screen-lg">
            <index />
        </div>
    </div>
</template>

<script>
import * as fb from '../DB/firebaseFunctions.js';
import TheHeader from '../components/TheHeader.vue';
import Index from '../components/profile/Index.vue';
import { useRoute, useRouter } from 'vue-router';
import { watchEffect, ref, provide } from 'vue';
export default {
    components: {
        TheHeader,
        Index,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { username } = route.params;
        const doesExist = ref(undefined);
        const getUser = ref(null);
        console.log(username);

        watchEffect(async () => {
            // get user by username

            getUser.value = await fb.getUserByUsername(username);
            // check if user exists
            if (!getUser.value) {
                // doesn't exist - goto not found route
                doesExist.value = false;
                router.replace('/notfound');
            } else {
                // does exist - set exists and show
                doesExist.value = true;
            }
        });

        provide('user', getUser);

        return {
            doesExist,
        };
    },
};
</script>
