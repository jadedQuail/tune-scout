<template>
    <div>
        <AppNavBar />
        <AppMyListsGrid :addMode="true" />
    </div>
</template>

<script setup>
import AppNavBar from "../components/AppNavBar.vue";
import AppMyListsGrid from "../components/AppMyListsGrid.vue";
</script>
