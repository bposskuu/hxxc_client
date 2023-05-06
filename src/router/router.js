import Registration from "@/components/Registration.vue";
import {createRouter, createWebHistory} from "vue-router"
import Login from "@/components/Login.vue";
import Disk from "@/components/Disk/Disk.vue";
import store from "@/store"
import SharedFile from "@/components/Disk/SharedFile.vue";
import UserProfile from "@/components/UserProfile.vue";

const routes = [
    {
        path: '/',
        component: Disk,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/registration',
        component: Registration
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/share/:url',
        component: SharedFile
    },
    {
        path: '/profile',
        component: UserProfile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/:catchAll(.*)",
        redirect: '/'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.getIsAuth) next()
        else next('/login')
    }
    else {
        next()
    }
})

export default router;