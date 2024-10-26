import { defineStore } from "pinia";
import { NavStates } from "../utilities/constants";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
        navState: NavStates.FULL,
    }),

    getters: {
        isAuthenticated: (state) => state.user !== null,
    },

    actions: {
        setUser(userData) {
            this.user = userData;
            this.navState = NavStates.LOGGED_IN;
        },
        clearUser() {
            this.user = null;
            this.navState = NavStates.FULL;
        },
        setNavState(newState) {
            if (Object.values(NavStates).includes(newState)) {
                this.navState = newState;
            }
        },
    },
});
