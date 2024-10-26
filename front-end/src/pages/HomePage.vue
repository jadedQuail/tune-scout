<template>
    <div>
        <AppNavBar />
        <AppSearchDialog />
    </div>
</template>

<script setup>
import AppNavBar from "../components/AppNavBar.vue";
import AppSearchDialog from "../components/AppSearchDialog.vue";
import { NavStates } from "../utilities/constants";
</script>
