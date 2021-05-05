<template>
    <div class="flex justify-between p-4">
        <div class="flex">
            <svg
                @click="toggleLike"
                class="w-8 mr-4 select-none cursor-pointer"
                :class="{ 'fill-current text-red-500': toggleLikedPhoto }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
            <svg
                @click="startAComment"
                @keydown="keyDownComment"
                class="w-8 text-black-light select-none cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
        </div>
    </div>
    <div class="p-4 py-0" v-if="theTotalLikes">
        <p class="font-bold">{{ totalLikesText }}</p>
    </div>
</template>

<script>
import * as fb from '../../hooks/useFirebase.js';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
    props: ['docId', 'totalLikes', 'likedPhoto', 'commentRef'],
    emits: ['startComment'],
    setup({ docId, totalLikes, likedPhoto }, context) {
        const toggleLikedPhoto = ref(likedPhoto);
        const theTotalLikes = ref(totalLikes);
        const store = useStore();
        const userId = store.getters.userId;

        const toggleLike = async () => {
            toggleLikedPhoto.value = !toggleLikedPhoto.value;

            await fb.photosCollection.doc(docId).update({
                likes: toggleLikedPhoto.value
                    ? fb.firestore.FieldValue.arrayUnion(userId)
                    : fb.firestore.FieldValue.arrayRemove(userId),
            });

            theTotalLikes.value = toggleLikedPhoto.value
                ? theTotalLikes.value + 1
                : theTotalLikes.value - 1;
        };

        const totalLikesText = computed(() => {
            return theTotalLikes.value + (theTotalLikes.value > 1 ? ' likes' : ' like');
        });

        const startAComment = () => {
            context.emit('startComment');
        };

        const keyDownComment = e => {
            if (e.key === 'Enter') {
                startAComment();
            }
        };

        return {
            toggleLike,
            toggleLikedPhoto,
            totalLikesText,
            theTotalLikes,
            startAComment,
            keyDownComment,
        };
    },
};
</script>
