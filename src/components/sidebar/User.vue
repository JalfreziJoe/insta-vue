<template>
    <content-loader height="61" v-if="!username || !fullname"></content-loader>
    <router-link :to="'/p/' + username" class="grid grid-cols-4 gap-4 mb-4 items-center">
        <div class="flex items-center justify-between col-span-1">
            <img class="rounded-full w-16 flex mr-3" :src="avatarImg" alt="My profile" />
        </div>
        <div class="col-span-3">
            <p class="font-bold text-sm">{{ username }}</p>
            <p class="text-sm">{{ fullname }}</p>
        </div>
    </router-link>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';
export default {
    components: {
        ContentLoader,
    },
    props: ['username', 'fullname'],
    computed: {
        avatarImg() {
            return `src/assets/images/avatars/${this.username}.jpg`;
        },
    },
};
</script>
