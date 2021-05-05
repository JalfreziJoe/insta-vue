<template>
    <div>
        <the-header
            :profile="profile"
            :photoCount="photoCount"
            :followersCount="followersCount"
            @changeFollowCount="handleChangeFollowCount"
        ></the-header>
        <the-photos :photos="photoCollection" />
    </div>
</template>

<script>
import * as fb from '../../DB/firebaseFunctions.js';
import { watchEffect, inject, computed, ref } from 'vue';
import TheHeader from './TheHeader.vue';
import ThePhotos from './ThePhotos.vue';

export default {
    components: {
        TheHeader,
        ThePhotos,
    },
    setup() {
        const photoCollection = ref(null);
        const followersCount = ref(0);
        const profile = inject('user');
        console.dir(profile);
        console.log(profile.value.followers.length);

        watchEffect(async () => {
            // get photos by username
            if (!profile.value.userId) return;
            const res = await fb.getUserPhotosByUserId(profile.value.userId);
            if (res) {
                photoCollection.value = res;
                followersCount.value = profile.value.followers.length;
            }
            console.dir(photoCollection.value);
        });

        const photoCount = computed(() => {
            let count = 0;
            if (photoCollection.value) {
                count = photoCollection.value.length;
            }
            return count;
        });

        const handleChangeFollowCount = isIncrementing => {
            if (isIncrementing) {
                followersCount.value += 1;
            } else {
                followersCount.value -= 1;
            }
        };

        return {
            profile,
            photoCollection: photoCollection,
            followersCount,
            photoCount,
            handleChangeFollowCount,
        };
    },
};
</script>
