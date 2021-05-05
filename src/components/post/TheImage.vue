<template>
    <div class="post__img">
        <img :src="src" :alt="caption" />
    </div>
</template>

<script>
export default {
    props: ['src', 'caption'],
};
</script>
