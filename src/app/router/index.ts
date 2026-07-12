import { createRouter, createWebHashHistory } from "vue-router"
import { MainMenuPage } from "@/pages/main-menu"
import { LevelSelectPage } from "@/pages/level-select"
import { LengthSelectPage } from "@/pages/select-length"
import { GamePage } from "@/pages/game"

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "menu", component: MainMenuPage },
    { path: "/levels", name: "levels", component: LevelSelectPage },
    { path: "/select", name: "select", component: LengthSelectPage },
    { path: "/game", name: "game", component: GamePage },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
})
