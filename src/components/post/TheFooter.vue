<template>
    <div class="p-4 pt-2 pb-0">
        <span class="mr-1 font-bold">{{ username }}</span>
        <span>{{ caption }}</span>
    </div>
</template>

<script>
export default {
    props: ['username', 'caption'],
};
</script>
