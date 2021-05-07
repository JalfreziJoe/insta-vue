<template>
    <div class="border-t border-gray">
        <form
            class="flex w-full justify-between pl-0 pr-5"
            @submit.prevent="onSubmit"
            method="POST"
        >
            <input
                aria-label="Add a comment"
                autoComplete="off"
                class="text-sm text-gray w-full mr-3 py-5 px-4"
                type="text"
                name="add-comment"
                placeholder="Add a comment..."
                v-model="comment"
                ref="inputComment"
            />
            <button
                class="text-sm font-bold text-blue-500"
                :class="{ 'opacity-25': !comment }"
                type="submit"
                :disabled="comment.length < 3"
            >
                Post
            </button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    emits: ['addNewComment'],
    setup(_, context) {
        const comment = ref('');
        const inputComment = ref(null);
        //console.log('inputComment: ' + inputComment);

        const onSubmit = event => {
            // check comment is greater than 2 chars
            if (comment.value.length < 3) return;
            context.emit('addNewComment', comment.value);
            comment.value = '';
        };

        return {
            comment,
            onSubmit,
            inputComment,
        };
    },
};
</script>
