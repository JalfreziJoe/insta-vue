<template>
    <div class="flex borde-b h-4 p-4 py-8">
        <div class="flex items-center">
            <router-link :to="'/p/' + username" class="flex items-center">
                <img
                    :src="'../assets/images/avatars/' + username + '.jpg'"
                    alt="profile picture"
                    class="rounded-full h-8 w-8 flex mr-3"
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
