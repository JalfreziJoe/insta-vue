<template>
    <div class="h-16 border-t border-gray mt-12 pt-4">
        <div class="grid grid-cols-3 gap-8 mt-4 mb-12" v-if="loading">
            <content-loader
                v-for="(_, key) in [...new Array(9)]"
                :key="key"
                width="320"
                height="400"
            />
        </div>
        <div class="grid grid-cols-3 gap-8 mt-4 mb-12" v-if="havePhotos">
            <div v-for="photo in photos" :key="photo.docId" class="relative group">
                <img :src="photo.imageSrc" :alt="photo.caption" />
            </div>
        </div>
        <p v-if="noPhotos" className="text-center text-2xl">No Photos Yet</p>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';
export default {
    props: ['photos'],
    data() {
        return {
            loading: true,
        };
    },
    created() {
        //console.log(this.photos);
    },
    components: {
        ContentLoader,
    },
    watch: {
        photos(newValue, oldValue) {
            //console.log('watching photos - new value:', newValue);
            //console.log('watching photos - old value:', oldValue);
            this.loading = false;
        },
    },
    computed: {
        havePhotos() {
            //this.loading = false;
            return this.getPhotos && this.getPhotos.length > 0;
        },
        noPhotos() {
            //this.loading = false;
            return !this.getPhotos || (this.getPhotos && this.getPhotos.length === 0);
        },
        getPhotos() {
            return this.photos;
        },
    },
};
</script>
