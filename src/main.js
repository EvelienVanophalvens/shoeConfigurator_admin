import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Home from './components/Home.vue'
import Shoe from './components/Shoe.vue'
import Changepassword from './components/Changepassword.vue'
import * as VueRouter from 'vue-router'

const routes = [
    { path: '/', component: Login },
    { path: '/Signup', component: Signup },
    { path: '/Home', component: Home },
    { path: '/Shoe', component: Shoe },
    { path: '/Changepassword', component: Changepassword }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')