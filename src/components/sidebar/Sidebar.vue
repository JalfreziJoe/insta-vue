<template>
    <div class="p-4" v-if="!!getUserId">
        <user :username="getUsername" :fullname="getFullname"></user>
        <suggestions :userId="getUserId"></suggestions>
    </div>
</template>

<script>
import User from './User.vue';
import Suggestions from './Suggestions.vue';

export default {
    components: {
        User,
        Suggestions,
    },
    computed: {
        getUserId() {
            return this.$store.getters.userId;
        },
        getUsername() {
            return this.$store.getters['users/username'];
        },
        getFullname() {
            return this.$store.getters['users/fullname'];
        },
    },
};
</script>
