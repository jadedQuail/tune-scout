<template>
    <div
        class="bg-electric-blue min-h-screen flex flex-col items-center justify-center"
    >
        <div class="text-white text-6xl mb-10">Login</div>

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
        </div>

        <div class="mt-6">
            <AppButton label="Login" @click="handleLogin" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppButton from "../components/AppButton.vue";
import { useUserStore } from "../stores/useUserStore";
import { loginUser } from "../services/credentialService";

const username = ref("");
const password = ref("");

const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
    const response = await loginUser(username.value, password.value);

    if (response.success) {
        userStore.setUser({ username: response.user.username });
        alert("Login successful");
        router.push("/");
    } else {
        alert("Login failed. Please check your username and password.");
    }
};
</script>
