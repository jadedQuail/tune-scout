import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";

const routes = [
    { path: "/", name: "Home", component: HomePage },
    { path: "/login", name: "Login", component: LoginPage },
    // Add other routes as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
