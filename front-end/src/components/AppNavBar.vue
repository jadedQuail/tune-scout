<template>
    <nav
        class="w-full bg-electric-blue flex justify-between items-center p-4 fixed top-0"
    >
        <div class="flex space-x-4">
            <AppButton label="Home" to="/" />
            <AppButton
                label="My Lists"
                v-if="
                    navState === NavStates.LOGGED_IN ||
                    navState === NavStates.FULL
                "
            />
        </div>
        <div class="flex space-x-4">
            <AppButton
                label="Sign Up"
                to="/sign-up"
                v-if="navState === NavStates.FULL"
            />
            <AppButton
                label="Login"
                to="/login"
                v-if="navState === NavStates.FULL"
            />
        </div>
    </nav>
</template>

<script setup>
import AppButton from "./AppButton.vue";
import { NavStates } from "../utilities/constants";

const props = defineProps({
    navState: {
        type: String,
        default: NavStates.FULL,
        validator: (value) => Object.values(NavStates).includes(value),
    },
});
</script>
