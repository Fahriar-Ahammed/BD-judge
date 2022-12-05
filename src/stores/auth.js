import { defineStore } from 'pinia';
import {api} from "boot/axios";

export const useAuthStore = defineStore('counter', {
  state: () => ({
    auth: localStorage.getItem("token"),
  }),
  getters: {
    // authData: (state) => state.auth,
    loggedIn: (state) => {
      return !(state.auth === null || state.auth === "");
    }
  },
  actions: {
    login(email,password) {
      console.log("login called")
      api.post('api/auth/login',
        {
          email: email,
          password: password,
        }).then(response => {
          localStorage.setItem("role", response.data.user.role)
          localStorage.setItem("token", response.data.access_token)
          this.auth = localStorage.getItem("token");
        })
    },
    logout() {
      const token = localStorage.getItem("token")
      api.post('api/auth/logout?token=' + token)
        .then(() => {
          localStorage.setItem("role", "")
          localStorage.setItem("token", "")
          this.auth = ""
        })
    }
  },
});
