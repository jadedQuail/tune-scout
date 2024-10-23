<template>
    <button
        class="bg-white text-electric-blue px-4 py-2 ml-3 rounded-lg text-lg font-semibold"
    >
        {{ label }}
    </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
});
</script>
