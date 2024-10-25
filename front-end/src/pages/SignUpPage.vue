<template>
    <div>
        <AppNavBar :navState="NavStates.MINIMAL" />
        <AppSignUpDialog />
    </div>
</template>

<script setup>
import AppNavBar from "../components/AppNavBar.vue";
import AppSignUpDialog from "../components/AppSignUpDialog.vue";
import { NavStates } from "../utilities/constants";
</script>
