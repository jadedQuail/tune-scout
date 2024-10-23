<template>
    <div
        class="bg-electric-blue min-h-screen flex flex-col items-center justify-center"
    >
        <div class="text-white text-6xl mb-10">Tune Scout</div>
        <div class="flex w-1/4">
            <input
                type="text"
                placeholder="Search..."
                class="px-4 py-2 rounded-lg w-full text-lg"
            />
            <AppButton label="Go" />
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
import AppButton from "./AppButton.vue";
</script>
