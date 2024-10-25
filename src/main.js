import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import './style.css'
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "./components/pages/LoginPage.vue";
import RegisterPage from "./components/pages/RegisterPage.vue";
import MyTodoList from "./components/pages/MyTodoList.vue";
import Profil from "./components/pages/Profil.vue";


axios.defaults.baseURL = "https://mock-api.binaryboxtuts.com/"
// axios.defaults.baseURL = import.meta.VITE_API_URL

axios.interceptors.request.use(function (config) {
  config.headers["X-Binarybox-Api-Key"] = 'binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt';
  // config.headers["X-Binarybox-Api-Key"] = import.meta.VITE_API_KEY;
  return config;
});
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: LoginPage },
    { path: "/register", component: RegisterPage },
    { path: "/mytodolist", component: MyTodoList },
    { path: "/profil", component: Profil }
  ],
});

createApp(App).use(router).mount("#app");
