import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app-main')!,
  props: {
    url: '/'
  }
})

export default app
