<template>
    <div v-if="isLoading" class="container col-span-2">
        <instagram-loader v-for="(_, index) in [...new Array(4)]" :key="index"></instagram-loader>
    </div>
    <div v-if="!isLoading && photos && photos.length > 0" class="container col-span-2">
        <the-post v-for="photo in photos" :key="photo.id" :content="photo"></the-post>
    </div>
    <div v-if="!isloading && photos && photos.length == 0" class="container col-span-2">
        <p class="text-center text-2xl">Follow people to see photos!</p>
    </div>
</template>

<script>
import { InstagramLoader } from 'vue-content-loader';
import useFollowedUserPhotos from '../hooks/useFollowedUserPhotos.js';
import ThePost from '../components/post/Index.vue';
import { useStore } from 'vuex';
import { watch, computed, ref } from 'vue';

export default {
    components: {
        ThePost,
        InstagramLoader,
    },
    setup() {
        const store = useStore();
        const isLoading = ref(true);
        let photos = ref(null);

        //let photosLoaded = false;
        const isUserLoaded = computed(() => {
            return store.getters['users/isUserLoaded'];
        });

        watch(isUserLoaded, () => {
            loadPhotos();
        });

        // watchEffect(() => {

        // });

        const loadPhotos = async () => {
            console.log('loadPhotos');
            if (!isUserLoaded) {
                return;
            }
            console.log('loaded loadPhotos');
            photos.value = await useFollowedUserPhotos(
                store.getters.userId,
                store.getters['users/following']
            );
            console.log(photos);
            isLoading.value = false;
        };

        loadPhotos();

        return {
            photos,
            isLoading,
        };
    },
};
</script>
