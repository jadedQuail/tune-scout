import { defineStore } from "pinia";
import { NavStates } from "../utilities/constants";

export const useUserStore = defineStore("user", {
    state: () => ({
        username: null,
        userId: null,
        navState: NavStates.FULL,
    }),

    getters: {
        isAuthenticated: (state) => state.userId !== null,
    },

    actions: {
        setUser({ userId, username }) {
            this.userId = userId;
            this.username = username;
            this.navState = NavStates.LOGGED_IN;
        },
        clearUser() {
            this.userId = null;
            this.username = null;
            this.navState = NavStates.FULL;
        },
        setNavState(newState) {
            if (Object.values(NavStates).includes(newState)) {
                this.navState = newState;
            }
        },
    },
});
