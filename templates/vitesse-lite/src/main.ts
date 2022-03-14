import routes from 'virtual:generated-pages'
import { ViteSSR } from 'vite-ssr-vue3'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

export const createApp = ViteSSR(App, { routes, base: import.meta.env.BASE_URL })
