<template>
    <button
        @click="handleClick"
        :class="[
            bgColor,
            textColor,
            'px-4 py-2 rounded-lg text-lg font-semibold',
        ]"
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
    bgColor: {
        type: String,
        default: "bg-white",
    },
    textColor: {
        type: String,
        default: "text-electric-blue-600",
    },
});

const router = useRouter();

function handleClick() {
    if (props.to) {
        router.push(props.to); // Navigate to the route if 'to' prop is provided
    }
}
</script>
