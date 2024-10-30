<template>
    <div class="bg-electric-blue-600 min-h-screen flex flex-col items-center">
        <div class="mt-6 w-3/4 mx-auto">
            <div v-if="currentSongs.length > 0">
                <div v-if="viewMode === TableViewMode.SEARCH">
                    <div class="mt-20 text-2xl text-white">
                        Click <strong>Add to List</strong> next to a search
                        result to add the song to one of your lists.
                    </div>
                    <div class="mt-6 text-2xl text-white">
                        Don't like your results? Click <strong>Home</strong> to
                        go back to the main site page to perform another search!
                        &#127901;
                    </div>
                </div>
                <div v-else>
                    <div class="mt-20 text-4xl text-white text-center">
                        {{ songListTitle }}
                    </div>
                    <div class="mt-6 text-2xl text-white text-center">
                        Click on the <strong>Remove</strong> button next to a
                        song to remove it from your list.
                    </div>
                </div>
                <table
                    class="mt-10 w-full text-left border-collapse border-2 border-gray-200"
                >
                    <thead>
                        <tr>
                            <th
                                class="border-2 border-gray-200 px-4 py-2 text-white text-3xl"
                            >
                                Song and Artist
                            </th>
                            <th
                                class="border-2 border-gray-200 px-4 py-2 text-white text-3xl"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(song, index) in currentSongs" :key="index">
                            <td
                                class="border-2 border-gray-200 px-4 py-2 text-white text-3xl"
                            >
                                <span class="text-lime-green-200">
                                    {{ song.title }}
                                </span>
                                by
                                <span class="text-neon-coral-200">
                                    {{ song.artist }}
                                </span>
                            </td>
                            <td
                                class="border-2 border-gray-200 px-4 py-2 text-white text-3xl"
                            >
                                <AppButton
                                    v-if="viewMode === TableViewMode.SEARCH"
                                    label="Add to List"
                                    :to="{
                                        path: '/add-song-to-list',
                                        query: {
                                            title: song.title,
                                            artist: song.artist,
                                        },
                                    }"
                                />
                                <AppButton
                                    v-else
                                    label="Remove"
                                    @click="handleRemove(song.song_id)"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <div
                    v-if="viewMode === TableViewMode.SEARCH"
                    class="text-2xl text-white text-center mt-20"
                >
                    No results found. Go back to <strong>Home</strong> and try
                    another search.
                </div>
                <div
                    v-if="viewMode === TableViewMode.VIEW_LIST"
                    class="text-2xl text-white text-center mt-20"
                >
                    This list is empty! Go search for some songs and add them
                    here. &#127901;
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AppButton from "./AppButton.vue";
import { TableViewMode } from "../utilities/constants";
import { getSongsFromList, deleteSong } from "../services/songListService";

const searchTerm = ref("");
const currentSongs = ref([]);
const viewMode = ref(TableViewMode.SEARCH);
const songListTitle = ref("");

const route = useRoute();

const loadSearchSongs = async () => {
    try {
        const response = await fetch("./songs.json");
        const data = await response.json();
        currentSongs.value = data;
    } catch (error) {
        console.error("Error loading search songs:", error);
    }
};

const loadListSongs = async (listId) => {
    try {
        const data = await getSongsFromList(listId);
        if (data) {
            currentSongs.value = data;
        } else {
            console.error("Failed to load songs from list.");
        }
    } catch (error) {
        console.error("Error loading list songs:", error);
    }
};

const filterSongs = () => {
    const term = searchTerm.value.trim().toLowerCase();
    currentSongs.value = currentSongs.value.filter(
        (song) =>
            song.title.toLowerCase().includes(term) ||
            song.artist.toLowerCase().includes(term)
    );
};

const handleRemove = async (songId) => {
    const confirmDelete = window.confirm(
        "Are you sure you want to remove this song from the list?\n(You can always search and re-add it again later)"
    );

    if (!confirmDelete) return;

    try {
        const success = await deleteSong(songId);
        if (success) {
            alert("Song removed successfully!");
            const listId = route.query.song_list_id || null;
            if (listId) {
                await loadListSongs(listId);
            }
        } else {
            alert("Failed to remove the song.");
        }
    } catch (error) {
        console.error("Error removing the song:", error);
        alert("An error occurred while removing the song.");
    }
};

onMounted(async () => {
    searchTerm.value = route.query.q || "";
    const listId = route.query.song_list_id || null;

    if (listId) {
        songListTitle.value = route.query.song_list_name;
        viewMode.value = TableViewMode.VIEW_LIST;
        await loadListSongs(listId);
    } else {
        viewMode.value = TableViewMode.SEARCH;
        await loadSearchSongs();
        filterSongs();
    }
});
</script>
