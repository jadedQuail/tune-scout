<template>
    <nav
        class="w-full bg-electric-blue-600 flex justify-between items-center p-4 fixed top-0"
    >
        <div class="flex space-x-4">
            <AppButton label="Home" to="/" />
            <AppButton
                label="My Lists"
                v-if="
                    userStore.navState === NavStates.LOGGED_IN ||
                    userStore.navState === NavStates.FULL
                "
            />
        </div>
        <div class="flex space-x-4">
            <template
                v-if="
                    userStore.navState === NavStates.LOGGED_IN && userStore.user
                "
            >
                <span class="text-white text-2xl">{{
                    userStore.user.username
                }}</span>
            </template>
            <template v-else-if="userStore.navState === NavStates.FULL">
                <AppButton label="Sign Up" to="/sign-up" />
                <AppButton label="Login" to="/login" />
            </template>
        </div>
    </nav>
</template>

<script setup>
import AppButton from "./AppButton.vue";
import { NavStates } from "../utilities/constants";
import { useUserStore } from "../stores/useUserStore";

const userStore = useUserStore();
</script>
