<template>
    <div class="p-4 pt-1 pb-4">
        <p v-if="updatedableComments.length > 3" class="text-sm text-gray-500 mb-1 cursor-pointer">
            View all {{ updatedableComments.length }} comments
        </p>
        <p v-for="com in top3Comments" :key="com.comment + '-' + com.username" class="mb-1">
            <router-link :to="'/p/' + com.username">
                <span class="mr-1 font-bold">{{ com.username }}</span>
            </router-link>
            <span>{{ com.comment }}</span>
        </p>
        <p class="text-gray uppercase text-xs mt-2">{{ daysAgo }} ago</p>
    </div>
    <add-comment @addNewComment="addANewComment" ref="inputComment"></add-comment>
</template>

<script>
import * as fb from '../../hooks/useFirebase.js';
import { formatDistance } from 'date-fns';
import AddComment from './AddComment.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
export default {
    components: { AddComment },
    props: ['docId', 'comments', 'posted'],
    setup({ docId, comments, posted }) {
        const store = useStore();
        const updatedableComments = ref(comments);

        const inputComment = ref(null);

        const top3Comments = computed(() => {
            return updatedableComments.value.slice(0, 3);
        });

        const daysAgo = computed(() => {
            return formatDistance(posted, new Date());
        });

        const addANewComment = comment => {
            //console.log('new comment');
            //console.log(comment);
            // get username
            const username = store.getters['users/username'];
            // store new comment in the comments array
            updatedableComments.value = [{ username, comment }, ...updatedableComments.value];
            return fb.photosCollection
                .doc(docId)
                .update({ comments: fb.firestore.FieldValue.arrayUnion({ username, comment }) });
        };

        //console.log(comments);

        return {
            top3Comments,
            daysAgo,
            comments,
            posted,
            addANewComment,
            updatedableComments,
            inputComment,
        };
    },
};
</script>
