import { createRouter, createWebHistory } from 'vue-router'
import TheLogin from "@/components/pages/TheLogin";
import Dashboard from "@/components/pages/Dashboard";
import Signup from "@/components/pages/Signup";
import store from "@/store";
import ProfileEdit from "@/components/pages/ProfileEdit";
import CreateBlog from "@/components/pages/CreateBlog";
import Blogs from "@/components/pages/Blogs";
import BlogPreview from "@/components/pages/BlogPreview";
import AddComment from "@/components/pages/AddComment";
import BlogEdit from "@/components/pages/BlogEdit";
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
  },
  {
    path : '/create-blog',
    component: CreateBlog,
    meta : {
      requiresAuth : true
    }
  },

  {
    path : '/blogs',
    component: Blogs
  },

  {
    path : '/blogs/:id/edit',
    component : BlogEdit,
    props : true
  },

  {
    path : '/blogs/:id',
    props : true,
    component : BlogPreview,
    children : [
      {
        path : 'add-comment',
        component : AddComment,
        meta : {
          requiresAuth : true
        },
        props : true
      }
    ]
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
