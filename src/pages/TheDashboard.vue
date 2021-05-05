<template>
    <the-header></the-header>
    <div class="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <the-timeline></the-timeline>
        <Sidebar></Sidebar>
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheTimeline from '../components/TheTimeline.vue';
import Sidebar from '../components/sidebar/Sidebar.vue';

export default {
    components: {
        TheHeader,
        TheTimeline,
        Sidebar,
    },
};
</script>
