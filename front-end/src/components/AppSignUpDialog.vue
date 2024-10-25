<template>
    <div
        class="bg-electric-blue min-h-screen flex flex-col items-center justify-center"
    >
        <div class="text-white text-6xl mb-10">Sign Up</div>

        <div class="flex flex-col w-1/4 space-y-4">
            <div class="flex items-center">
                <label for="username" class="text-white text-lg w-1/3"
                    >Username</label
                >
                <input
                    v-model="username"
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    class="px-4 py-2 rounded-lg w-2/3 text-lg"
                />
            </div>

            <div class="flex items-center">
                <label for="password" class="text-white text-lg w-1/3"
                    >Password</label
                >
                <input
                    v-model="password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    class="px-4 py-2 rounded-lg w-2/3 text-lg"
                />
            </div>

            <div class="flex items-center">
                <label for="confirmPassword" class="text-white text-lg w-1/3"
                    >Confirm Password</label
                >
                <input
                    v-model="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    class="px-4 py-2 rounded-lg w-2/3 text-lg"
                />
            </div>
        </div>

        <div class="mt-6">
            <AppButton label="Sign Up" @click="handleSignUp" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import AppButton from "../components/AppButton.vue";
import { registerUser } from "../services/credentialService";
import { NavStates } from "../utilities/constants";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleSignUp = async () => {
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        return;
    }

    const success = await registerUser(username.value, password.value);
    if (success) {
        alert("User registered successfully!");
        router.push("/");
    } else {
        alert("Registration failed.");
    }
};
</script>
