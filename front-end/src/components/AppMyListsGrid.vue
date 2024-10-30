<template>
    <div class="bg-electric-blue-600 min-h-screen flex flex-col items-center">
        <div v-if="!addMode" class="w-1/4 mt-20 flex flex-col items-center">
            <div
                class="bg-white w-full flex flex-col text-black font-bold rounded-md shadow-md p-5"
            >
                <span class="mb-3 text-center mt-2 text-2xl"
                    >Create Multiple Lists From Text File</span
                >
                <span class="mb-3 text-center mt-2 text-md"
                    >For each song list you would like to create, please create
                    another row in your text file.</span
                >
                <div class="flex justify-center items-center w-full">
                    <input
                        type="file"
                        accept=".txt"
                        @change="handleFileUpload"
                        class="px-4 py-2 rounded-lg w-full text-lg"
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-wrap gap-4 p-4 justify-center w-full mt-20">
            <div
                class="bg-white w-52 h-52 flex flex-col text-black font-bold rounded-md shadow-md p-5"
            >
                <span class="mb-auto text-center mt-5"> New List </span>
                <AppButton
                    label="+"
                    bgColor="bg-electric-blue-600"
                    textColor="text-white"
                    @click="handleCreateList"
                />
            </div>
            <div
                v-for="list in songLists"
                :key="list.song_list_id"
                class="bg-white w-52 h-52 flex flex-col text-black font-bold rounded-md shadow-md p-5"
            >
                <span class="mb-auto text-center mt-5"> {{ list.name }} </span>
                <div class="flex justify-center mt-auto w-full">
                    <AppButton
                        v-if="addMode"
                        label="Add Here"
                        bgColor="bg-green-600"
                        textColor="text-white"
                        @click="handleAddSong(list.song_list_id)"
                    />
                    <div v-else class="flex justify-between w-full">
                        <AppButton
                            label="Edit"
                            bgColor="bg-electric-blue-600"
                            textColor="text-white"
                            @click="handleEdit(list.song_list_id, list.name)"
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
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppButton from "./AppButton.vue";
import {
    getSongLists,
    deleteSongList,
    addSongToList,
    createSongList,
} from "../services/songListService";
import { useUserStore } from "../stores/useUserStore";

defineProps({
    addMode: {
        type: Boolean,
        default: false,
    },
});

const songLists = ref([]);
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

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

const handleAddSong = async (songListId) => {
    const title = route.query.title;
    const artist = route.query.artist;

    if (!title || !artist) {
        alert("Song details are missing.");
        return;
    }

    const success = await addSongToList(title, artist, songListId);

    if (success) {
        alert(`Song "${title}" by "${artist}" added to the list successfully!`);
    } else {
        alert("Failed to add song to the list.");
    }

    router.push("/my-lists");
};

const handleEdit = (songListId, songListName) => {
    router.push({
        path: "/view-list-page",
        query: { song_list_id: songListId, song_list_name: songListName },
    });
};

const handleCreateList = () => {
    router.push({
        path: "/create-list",
        query: { ...route.query },
    });
};

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const content = e.target.result;
        const listNames = content
            .split("\n")
            .map((name) => name.trim())
            .filter((name) => name);

        if (listNames.length > 0) {
            for (const name of listNames) {
                const success = await createSongList(name, userStore.userId);
                if (!success) {
                    console.error(`Failed to create list: ${name}`);
                }
            }
            alert("Lists created successfully!");
            fetchSongLists();
        } else {
            alert("The file appears to be empty or invalid.");
        }
    };

    reader.readAsText(file);
};

onMounted(() => {
    fetchSongLists();
});
</script>
