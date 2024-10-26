<template>
    <div class="bg-electric-blue-600 min-h-screen flex flex-col items-center">
        <div class="mt-20 w-3/4 mx-auto">
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
