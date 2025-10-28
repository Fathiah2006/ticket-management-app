import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/styles.css';
const resizeObserverError = window.console.error
window.console.error = (...args) => {
  if (
    args[0]?.includes?.('ResizeObserver loop') ||
    args[0]?.message?.includes?.('ResizeObserver loop')
  ) {
    return
  }
  resizeObserverError(...args)
}

const app = createApp(App)

app.use(router)

app.mount('#app')