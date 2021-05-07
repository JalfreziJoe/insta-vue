<template>
    <div class="flex flex-row items-center align-items justify-between" v-if="!getFollowed">
        <div class="flex items-center justify-between">
            <img class="rounded-full w-8 flex mr-3" :src="avatarSrc" :alt="'Follow ' + username" />
            <router-link :to="`/p/${username}`">
                <p class="font-bold text-sm">{{ username }}</p>
            </router-link>
        </div>
        <div class="flex">
            <button class="text-sm font-bold text-blue" type="button" @click="handleFollowUser">
                Follow
            </button>
        </div>
    </div>
</template>

<script>
import * as fb from '../../DB/firebaseFunctions.js';
export default {
    props: ['userDocId', 'username', 'profileId', 'userId'],
    data() {
        return {
            followed: false,
        };
    },
    computed: {
        avatarSrc() {
            return `/assets/images/avatars/${this.username}.jpg`;
        },
        getFollowed() {
            return this.followed;
        },
    },
    methods: {
        async handleFollowUser() {
            this.followed = true;
            // get docId userbyId
            const { docId } = await fb.getUserById(this.userId);
            // update this users following
            await fb.updateUserFollowing(docId, this.profileId, null, true);
            // update user followers
            await fb.updateUserFollowing(this.userDocId, this.userId, null, false);
            this.getFollowed;
        },
    },
};
</script>
