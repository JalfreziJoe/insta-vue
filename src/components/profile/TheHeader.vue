<template>
    <div class="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div class="container flex justify-center">
            <img
                class="rounded-full h-40 w-40 flex"
                :alt="profileUsername + ' profile picture'"
                :src="`/assets/images/avatars/${profileUsername}.jpg`"
            />
        </div>
        <div class="flex items-center justify-center flex-col col-span-2">
            <div class="container flex items-center">
                <p class="text-2xl mr-4">{{ profileUsername }}</p>

                <button
                    v-if="activeBtnFollow"
                    class="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
                    type="button"
                    @Click="handleToggleFollow"
                >
                    {{ isFollowingProfile ? 'Unfollow' : 'Follow' }}
                </button>
            </div>
            <div class="container flex mt-4">
                <content-loader
                    v-if="followers === undefined || following === undefined"
                    width="677"
                    height="24"
                />
                <div v-else>
                    <p class="mr-10">
                        <span class="font-bold">{{ photoCount }}</span> photos
                    </p>
                    <p class="mr-10">
                        <span class="font-bold">{{ followers }}</span>
                        {{ followers === 1 ? ' follower' : ' followers' }}
                    </p>
                    <p class="mr-10">
                        <span class="font-bold">{{ following.length }}</span> following
                    </p>
                </div>
            </div>
            <div class="container mt-4">
                <p class="font-medium" v-if="!profileFullname">
                    <content-loader height="24" />
                </p>
                <p class="font-medium" v-else>{{ profileFullname }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import * as fb from '../../DB/firebaseFunctions.js';
import { useStore } from 'vuex';
import { ref, toRefs, watchEffect } from 'vue';
import { ContentLoader } from 'vue-content-loader';
export default {
    components: {
        ContentLoader,
    },
    emits: ['changeFollowCount'],
    props: ['photoCount', 'profile', 'followersCount'],
    setup(props, { emit }) {
        const store = useStore();
        //console.dir(props);
        const { photoCount, profile, followersCount } = toRefs(props);
        //console.log(followersCount.value);
        const isFollowingProfile = ref(false);
        const {
            docId: profileDocId,
            fullname: profileFullname,
            username: profileUsername,
            following = [],
        } = profile.value;

        const loggedInUsername = store.getters['users/username'];
        const loggedInUserId = store.getters.userId;

        const activeBtnFollow = loggedInUsername && loggedInUsername !== profileUsername;

        watchEffect(async () => {
            // if we have user.username && profileUserId
            if (loggedInUsername && profileDocId) {
                const isFollowing = await fb.isLoggedInUserFollowing(
                    loggedInUsername,
                    profileDocId
                );
                // get isLoggedInUserFollowingProfile
                // set result
                isFollowingProfile.value = isFollowing;
            }
        });

        // handle method for toggleFollow button
        const handleToggleFollow = async () => {
            // toggle a ref
            isFollowingProfile.value = !isFollowingProfile.value;
            emit('changeFollowCount', isFollowingProfile.value);
            // toggleFollow method(fb function)
            await fb.toggleFollow(isFollowingProfile.value, loggedInUserId, profileDocId);
        };

        return {
            handleToggleFollow,
            activeBtnFollow,
            isFollowingProfile,
            following,
            followers: followersCount,
            profileFullname,
            profileUsername,
            photoCount,
        };
    },
};
</script>
