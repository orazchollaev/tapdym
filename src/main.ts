import { createApp } from "vue"
import "@fontsource/baloo-2/400.css"
import "@fontsource/baloo-2/500.css"
import "@fontsource/baloo-2/600.css"
import "@fontsource/baloo-2/700.css"
import "@fontsource/baloo-2/800.css"
import App from "@/app/App.vue"
import { router } from "@/app/router"
import { pinia } from "@/app/providers/pinia"
import "@/app/styles/index.css"

createApp(App).use(pinia).use(router).mount("#app")
