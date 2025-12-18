import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './assets/css/style.css'
import App from './App.vue'

const app = createApp(App)

// Use Plugins
app.use(MotionPlugin)

app.mount('#app')