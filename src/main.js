import { createApp } from 'vue'
import App from './App.vue'
import GAuth from '/src/plugins/google-oauth';
const app = createApp(App)
let gauthClientId = "768834812579-ivi0oopbkqe05cg6t41p83t7gteekut6.apps.googleusercontent.com";
app.use(GAuth, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false })
app.mount('#app')
