<template>
    <button
        @click="handleClick"
        class="bg-white text-electric-blue px-4 py-2 ml-3 rounded-lg text-lg font-semibold"
    >
        {{ label }}
    </button>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: false,
    },
});

const router = useRouter();

function handleClick() {
    if (props.to) {
        router.push(props.to); // Navigate to the route if 'to' prop is provided
    }
}
</script>
