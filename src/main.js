import { createApp } from 'vue'
import App from './App.vue'
import GAuth from '/src/plugins/google-oauth';
const app = createApp(App)
let gauthClientId = "794381519357-7a59g9psl47ut2hjp6d0nv0sa0juifgc.apps.googleusercontent.com";
app.use(GAuth, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false })
app.mount('#app')
