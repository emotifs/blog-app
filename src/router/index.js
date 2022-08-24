import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from "@/components/pages/TheLogin";
import Dashboard from "@/components/pages/Dashboard";
import Signup from "@/components/pages/Signup";
import store from "@/store";
const routes = [
  {
    path : '/login',
    component : TheLogin
  },
  {
    path:  '/dashboard',
    component: Dashboard,
    meta : {
      requiresAuth : true
    }
  },
  {
    path : '/register',
    component: Signup,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function (to, _, next){
  if(to.meta.requiresAuth && !store.getters.isAuth){
    next("/login");
  } else{
    next();
  }
})

export default router
