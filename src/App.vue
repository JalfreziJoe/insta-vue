<template>
    <router-view></router-view>
</template>

<script>
export default {
    setup() {
        //console.log(import.meta.env);
        document.title = import.meta.env.VITE_APP_TITLE;
    },
};
</script>

<style>
body {
    background-color: #fafafa;
}
</style>
