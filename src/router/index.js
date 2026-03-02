import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : "/todolist",
      name : "todoList",
      component : () => import("../views/TodoList.vue")
    },
    {
      path : "/register",
      name : "Register",
      component : () => import("../views/Register.vue")
    },
    {
      path : "/login",
      name : "Login",
      component : () => import("../views/Login.vue")
    }
  ]
})

export default router
