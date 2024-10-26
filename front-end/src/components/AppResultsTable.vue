<template>
    <div class="bg-electric-blue-600 min-h-screen flex flex-col items-center">
        <div class="mt-20 text-2xl text-white w-3/4">
            Click <strong>Add to List</strong> next to a search result to add
            the song to one of your lists.
        </div>
        <div class="mt-6 text-2xl text-white w-3/4">
            Don't like your results? Click <strong>Home</strong> to go back to
            the main site page to perform another search! &#127901;
        </div>
        <div class="mt-6 w-3/4 mx-auto">
            <div v-if="filteredSongs.length > 0">
                <table
                    class="mt-6 w-full text-left border-collapse border-2 border-gray-200"
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
                        <tr v-for="(song, index) in filteredSongs" :key="index">
                            <td
                                class="border-2 border-gray-200 px-4 py-2 text-white text-3xl"
                            >
                                <span class="text-lime-green-200">
                                    {{ song.name }}
                                </span>
                                by
                                <span class="text-neon-coral-200">
                                    {{ song.artist }}
                                </span>
                            </td>
                            <td
                                class="border-2 border-gray-200 px-4 py-2 text-white text-3xl"
                            >
                                <AppButton label="Add to List" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="mt-6 text-2xl text-white text-center">
                No results found. Go back to <strong>Home</strong> and try
                another search.
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import AppButton from "./AppButton.vue";

const searchTerm = ref("");
const songs = ref([]);
const filteredSongs = ref([]);

const route = useRoute();

const loadSongs = async () => {
    try {
        const response = await fetch("./songs.json");
        const data = await response.json();
        songs.value = data;
    } catch (error) {
        console.error("Error loading songs:", error);
    }
};

const filterSongs = () => {
    const term = searchTerm.value.trim().toLowerCase();
    filteredSongs.value = songs.value.filter(
        (song) =>
            song.name.toLowerCase().includes(term) ||
            song.artist.toLowerCase().includes(term)
    );
};

onMounted(async () => {
    searchTerm.value = route.query.q || "";

    console.log(searchTerm.value);

    await loadSongs();
    filterSongs();
});
</script>
