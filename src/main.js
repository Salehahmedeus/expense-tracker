import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Ensure theme is applied before app mounts to avoid flashes and toggle issues
const savedTheme = localStorage.getItem('theme')
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
document.documentElement.classList.toggle('dark', isDark)

createApp(App).mount('#app')
