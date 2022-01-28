import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoList from './pages/todoList/index'
import Collection from './pages/collection'
import ProgramList from './pages/programList'
import WishList from './pages/wishList'
import TodoItemList from './pages/todoList/components/todoItemList'
import ChooseAddress from './pages/map'

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
  },
  {
    path: '/chooseAddress',
    component: ChooseAddress
  }
  
]

const router = new VueRouter({
  routes
})

export default router