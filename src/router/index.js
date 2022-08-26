import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from "@/components/pages/TheLogin";
import Dashboard from "@/components/pages/Dashboard";
import Signup from "@/components/pages/Signup";
import store from "@/store";
import ProfileEdit from "@/components/pages/ProfileEdit";
const routes = [
  {
    path : '/',
    redirect : '/login'
  },
  {
    path : '/login',
    component : TheLogin,
    meta : {
      requiresUnAuth : true
    }
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
    meta : {
      requiresUnAuth : true
    }
  },
  {
    path : '/profile',
    component: ProfileEdit,
    meta : {
      requiresAuth : true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function (to, _, next){
  if(to.meta.requiresAuth && !store.getters.isAuth){
    next("/login");
  } else if(to.meta.requiresUnAuth && store.getters.isAuth){
    next('/dashboard')
  }
  else{
    next();
  }
})

export default router
