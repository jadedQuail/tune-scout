import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/useUserStore";
import { NavStates } from "../utilities/constants";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import ResultsPage from "../pages/ResultsPage.vue";
import MyListsPage from "../pages/MyListsPage.vue";
import CreateListPage from "../pages/CreateListPage.vue";

const routes = [
    { path: "/", name: "Home", component: HomePage },
    { path: "/login", name: "Login", component: LoginPage },
    { path: "/sign-up", name: "SignUp", component: SignUpPage },
    { path: "/results", name: "Results", component: ResultsPage },
    {
        path: "/my-lists",
        name: "MyLists",
        component: MyListsPage,
        meta: { requiresAuth: true },
    },
    {
        path: "/create-list",
        name: "CreateList",
        component: CreateListPage,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next({ name: "Home" });
    } else {
        if (userStore.isAuthenticated) {
            userStore.setNavState(NavStates.LOGGED_IN);
        } else if (to.name === "Login" || to.name === "SignUp") {
            userStore.setNavState(NavStates.MINIMAL);
        } else {
            userStore.setNavState(NavStates.FULL);
        }

        next();
    }
});

export default router;
