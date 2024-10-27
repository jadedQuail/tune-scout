<template>
    <div
        class="bg-electric-blue-600 min-h-screen flex items-start justify-center"
    >
        <div class="flex flex-wrap gap-4 p-4 justify-center w-full mt-20">
            <div
                class="bg-white w-52 h-52 flex flex-col text-black font-bold rounded-md shadow-md p-5"
            >
                <span class="mb-auto text-center mt-5"> New List </span>
                <AppButton
                    label="+"
                    bgColor="bg-electric-blue-600"
                    textColor="text-white"
                    to="/create-list"
                />
            </div>
            <div
                v-for="list in songLists"
                :key="list.song_list_id"
                class="bg-white w-52 h-52 flex flex-col text-black font-bold rounded-md shadow-md p-5"
            >
                <span class="mb-auto text-center mt-5"> {{ list.name }} </span>
                <div class="flex justify-between mt-auto w-full">
                    <AppButton
                        label="Edit"
                        bgColor="bg-electric-blue-600"
                        textColor="text-white"
                    />
                    <AppButton
                        label="Delete"
                        bgColor="bg-electric-blue-600"
                        textColor="text-white"
                        @click="handleDelete(list.song_list_id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AppButton from "./AppButton.vue";
import { getSongLists, deleteSongList } from "../services/songListService";
import { useUserStore } from "../stores/useUserStore";

const songLists = ref([]);
const userStore = useUserStore();

const fetchSongLists = async () => {
    if (userStore.isAuthenticated) {
        const lists = await getSongLists(userStore.userId);
        if (lists) {
            songLists.value = lists;
        } else {
            console.error("Failed to fetch song lists.");
        }
    }
};

const handleDelete = async (songListId) => {
    if (!userStore.isAuthenticated) {
        alert("You need to be logged in to delete a song list.");
        return;
    }

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this song list?\nIt cannot be recovered once it's gone."
    );
    if (!confirmDelete) {
        return;
    }

    const success = await deleteSongList(songListId);
    if (success) {
        alert("Song list deleted successfully!");
        fetchSongLists();
    } else {
        alert("Failed to delete song list.");
    }
};

onMounted(() => {
    fetchSongLists();
});
</script>
