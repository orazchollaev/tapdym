import { createRouter, createWebHashHistory } from "vue-router"
import { MainMenuPage } from "@/pages/main-menu"
import { LengthSelectPage } from "@/pages/select-length"
import { GamePage } from "@/pages/game"

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "menu", component: MainMenuPage },
    { path: "/select", name: "select", component: LengthSelectPage },
    { path: "/game", name: "game", component: GamePage },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
})
