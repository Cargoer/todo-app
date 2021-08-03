import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from './components/TodoList'
import Collection from './components/Collection'
import ProgramList from './components/ProgramList'
import WishList from './components/WishList'
import TodoItemList from './components/TodoList/TodoItemList'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/collection',
    component: Collection
  },
  {
    path: '/todolist',
    component: TodoList,
    children: [
      {
        path: '/todolist/:listmode',
        component: TodoItemList
      },
      {
        path: '/',
        redirect: '/todolist/notdone'
      }
    ],
  },
  {
    path: '/programlist',
    component: ProgramList
  },
  {
    path: '/wishlist',
    component: WishList
  },
  {
    path: '/',
    redirect: '/todolist/notdone'
  }
  
]

const router = new VueRouter({
  routes
})

export default router