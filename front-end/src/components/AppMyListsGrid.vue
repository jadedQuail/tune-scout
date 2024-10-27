<template>
    <div
        class="bg-electric-blue-600 min-h-screen flex items-start justify-center"
    >
        <div class="flex flex-wrap gap-4 p-4 justify-center w-full mt-20">
            <div
                class="bg-white w-52 h-52 flex flex-col text-black font-bold rounded-md shadow-md p-5"
            >
                <span class="mb-auto text-center mt-5"> New List </span>
                <AppButton
                    label="+"
                    bgColor="bg-electric-blue-600"
                    textColor="text-white"
                    to="/create-list"
                />
            </div>
            <div
                v-for="box in 7"
                :key="box"
                class="bg-white w-52 h-52 flex flex-col text-black font-bold rounded-md shadow-md p-5"
            >
                <span class="mb-auto text-center mt-5"> My List Name </span>
                <div class="flex justify-between mt-auto w-full">
                    <AppButton
                        label="Edit"
                        bgColor="bg-electric-blue-600"
                        textColor="text-white"
                    />
                    <AppButton
                        label="Delete"
                        bgColor="bg-electric-blue-600"
                        textColor="text-white"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppButton from "./AppButton.vue";
</script>
