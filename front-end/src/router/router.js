import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/useUserStore";
import { NavStates } from "../utilities/constants";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import ResultsPage from "../pages/ResultsPage.vue";

const routes = [
    { path: "/", name: "Home", component: HomePage },
    { path: "/login", name: "Login", component: LoginPage },
    { path: "/sign-up", name: "SignUp", component: SignUpPage },
    { path: "/results", name: "Results", component: ResultsPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (userStore.user) {
        userStore.setNavState(NavStates.LOGGED_IN);
    } else if (to.name === "Login" || to.name === "SignUp") {
        userStore.setNavState(NavStates.MINIMAL);
    } else {
        userStore.setNavState(NavStates.FULL);
    }

    next();
});

export default router;
