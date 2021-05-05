<template>
    <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex';

export default {
    setup() {
        //console.log(import.meta.env);
        const checkLogin = async () => {
            await useStore().dispatch('checkLogin');
        };
        //checkLogin();
        document.title = import.meta.env.VITE_APP_TITLE;
    },
};
</script>

<style>
body {
    background-color: #fafafa;
}
</style>
