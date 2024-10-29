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
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/useUserStore";
import { createSongList, addSongToList } from "../services/songListService";
import AppButton from "../components/AppButton.vue";

const newListName = ref("");
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const createList = async () => {
    if (!newListName.value) {
        alert("Please provide a list name.");
        return;
    }

    if (!userStore.isAuthenticated) {
        alert("User is not authenticated.");
        return;
    }

    const response = await createSongList(newListName.value, userStore.userId);

    if (response.success) {
        alert("Song list created successfully!");

        const newListId = response.song_list_id;
        const title = route.query.title;
        const artist = route.query.artist;

        if (title && artist) {
            const songAdded = await addSongToList(title, artist, newListId);

            if (songAdded) {
                alert(
                    `Song "${title}" by "${artist}" added to the new list successfully!`
                );
            } else {
                alert("Failed to add song to the new list.");
            }
        }

        newListName.value = "";
        router.push("/my-lists");
    } else {
        alert("Failed to create song list. Please try again.");
    }
};
</script>
