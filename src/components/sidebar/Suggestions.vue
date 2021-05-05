<template>
    <content-loader height="150" class="mt-5" v-if="!haveProfiles"></content-loader>
    <div class="flex flex-col" v-else>
        <div class="flex items-center align-items justify-between mb-2 mt-2">
            <p clas="font-bold text-gray text-sm">Suggestions for you</p>
        </div>
    </div>
    <div class="grid gap-5 mt-4" v-if="haveProfileLength">
        <suggested-profiles
            v-for="res in result"
            :key="res.docId"
            :userDocId="res.docId"
            :username="res.username"
            :profileId="res.userId"
            :userId="userId"
        ></suggested-profiles>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';
import * as fb from '../../DB/firebaseFunctions.js';
import SuggestedProfiles from './SuggestedProfiles.vue';
import { ref, watchEffect, computed } from 'vue';
export default {
    components: {
        SuggestedProfiles,
        ContentLoader,
    },
    props: ['userId'],
    setup({ userId }) {
        const result = ref('');
        const getSuggestedProfiles = async () => {
            result.value = await fb.getSuggestedProfiles(userId);
        };

        const haveProfiles = computed(() => {
            return !!result.value;
        });

        const haveProfileLength = computed(() => {
            console.log(result.value);
            if (result.value != '' && result.value.length > 0) {
                return true;
            } else {
                return false;
            }
        });

        watchEffect(() => {
            if (userId) {
                getSuggestedProfiles();
            }
        });

        return {
            haveProfiles,
            result,
            userId,
            haveProfileLength,
        };
    },
};
</script>
