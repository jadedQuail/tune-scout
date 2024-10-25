import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";

const routes = [
    { path: "/", name: "Home", component: HomePage },
    { path: "/login", name: "Login", component: LoginPage },
    { path: "/sign-up", name: "SignUp", component: SignUpPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
