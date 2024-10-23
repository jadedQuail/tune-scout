<template>
    <nav
        class="w-full bg-electric-blue flex justify-between items-center p-4 fixed top-0"
    >
        <div class="flex space-x-4">
            <AppButton label="Home" />
            <AppButton label="My Lists" />
        </div>
        <div class="flex space-x-4">
            <AppButton label="Sign Up" />
            <AppButton label="Login" />
        </div>
    </nav>
</template>

<script setup>
import AppButton from "./AppButton.vue";
</script>
