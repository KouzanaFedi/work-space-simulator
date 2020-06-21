import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import TodoList from '../Components/todo-list-manager/TodoList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/todoList',
    name: 'TodoList',
    component: TodoList
  }
]

const router = new VueRouter({
  mode: "hash",
  routes
})

export default router
