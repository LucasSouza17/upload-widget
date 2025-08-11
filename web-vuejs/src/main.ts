/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins/index.js'

// Components
import App from './app.vue'

// Composables
import { createApp } from 'vue'

// Styles
import { createPinia } from 'pinia'
import './index.css'

const pinia = createPinia()
const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.mount('#app')
