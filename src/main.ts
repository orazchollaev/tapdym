import { createApp } from 'vue'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import App from '@/app/App.vue'
import { router } from '@/app/router'
import { pinia } from '@/app/providers/pinia'
import '@/app/styles/index.css'

createApp(App).use(pinia).use(router).mount('#app')
