<template>
    <div class="flex border-b h-4 p-4 py-8">
        <div class="flex items-center">
            <router-link :to="'/p/' + username" class="flex items-center">
                <img
                    class="rounded-full h-8 w-8 flex mr-3"
                    :src="'src/assets/images/avatars/' + username + '.jpg'"
                    :alt="username + ' profile picture'"
                />
                <p class="font-bold">{{ username }}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['username'],
};
</script>
