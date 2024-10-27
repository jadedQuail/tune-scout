<template>
    <div
        class="bg-electric-blue-600 min-h-screen flex flex-col items-center justify-center"
    >
        <div class="text-white text-6xl mb-10">Create a New List</div>
        <div class="flex w-1/4">
            <input
                v-model="newListName"
                type="text"
                placeholder="List Name"
                class="px-4 py-2 rounded-lg w-full text-lg"
            />
        </div>
        <div class="w-1/4 flex justify-center mt-6">
            <AppButton label="Create" @click="createList" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/useUserStore";
import { createSongList } from "../services/songListService";
import AppButton from "../components/AppButton.vue";

const newListName = ref("");
const userStore = useUserStore();

const createList = async () => {
    if (!newListName.value) {
        alert("Please provide a list name.");
        return;
    }

    if (!userStore.isAuthenticated) {
        alert("User is not authenticated.");
        return;
    }

    const success = await createSongList(newListName.value, userStore.userId);

    if (success) {
        alert("Song list created successfully!");
        newListName.value = "";
    } else {
        alert("Failed to create song list. Please try again.");
    }
};
</script>
