<template>
    <div
        class="bg-electric-blue min-h-screen flex flex-col items-center justify-center"
    >
        <div class="text-white text-6xl mb-10">Tune Scout</div>
        <div class="flex w-1/4">
            <input
                v-model="searchTerm"
                type="text"
                placeholder="Search..."
                class="px-4 py-2 rounded-lg w-full text-lg"
            />
            <AppButton label="Go" @click="goToResults" />
        </div>
        <div class="flex flex-col items-center mt-6">
            <div class="text-white text-xl">
                Search for songs above and add them to your lists.
            </div>
            <div class="text-white text-xl">Your music, organized!</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppButton from "./AppButton.vue";

const router = useRouter();

const searchTerm = ref("");

const goToResults = () => {
    if (searchTerm.value.trim() !== "") {
        router.push({
            path: "/results",
            query: { q: searchTerm.value },
        });
    }
};
</script>
