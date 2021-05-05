<template>
    <div class="rounded col-span-4 border bg-white mb-16">
        <the-header :username="content.username"></the-header>
        <the-image :src="content.imageSrc" :caption="content.caption"></the-image>
        <the-actions
            :docId="content.docId"
            :likedPhoto="content.userLikedPhoto"
            :totalLikes="content.likes.length"
            @startComment="commentFocus"
        ></the-actions>
        <the-footer :username="content.username" :caption="content.caption"></the-footer>
        <the-comments
            :docId="content.docId"
            :comments="content.comments"
            :posted="content.dateCreated"
            ref="inputComment"
        ></the-comments>
    </div>
</template>

<script>
import TheHeader from './TheHeader.vue';
import TheImage from './TheImage.vue';
import TheActions from './TheActions.vue';
import TheComments from './TheComments.vue';
import TheFooter from './TheFooter.vue';

export default {
    components: {
        TheHeader,
        TheImage,
        TheActions,
        TheFooter,
        TheComments,
    },
    props: ['content'],

    methods: {
        commentFocus() {
            //console.log('comment focus');
            //console.dir(this.$refs.inputComment.inputComment.inputComment);
            this.$refs.inputComment.inputComment.inputComment.focus();
        },
    },
};
</script>
