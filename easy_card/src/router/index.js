import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import QRCreate from "@/views/QRCreate.vue";
import UserInfo from "@/views/UserInfo.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/qr_create",
    name: "QRCreate",
    component: QRCreate,
  },
  {
    path: "/user_info",
    name: "userInfo",
    component: UserInfo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
