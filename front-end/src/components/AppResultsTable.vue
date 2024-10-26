<template>
    <div
        class="bg-electric-blue min-h-screen flex flex-col items-center justify-center"
    >
        <div class="mt-20">
            <div v-if="filteredSongs.length > 0">
                <table
                    class="mt-6 w-full text-left border-collapse border border-gray-200"
                >
                    <thead>
                        <tr>
                            <th class="border border-gray-200 px-4 py-2">
                                Song and Artist
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(song, index) in filteredSongs" :key="index">
                            <td class="border border-gray-200 px-4 py-2">
                                {{ song.name }} by {{ song.artist }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="mt-6 text-xl">No results found.</div>
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
