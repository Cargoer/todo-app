<template>
  <div id="todo-list" >
    <Tabbar />
    
    <div class="header">
      <h1>待办事项</h1>
      <Datetime />
    </div>

    <TodoInput />
    <div class="choose-mode">
        <div :class="{active: listMode === 'notdone'}" @click="$router.push('/todolist/notdone')">未完成</div>
        <div :class="{active: listMode === 'done'}" @click="$router.push('/todolist/done')">已完成</div>
        <div :class="{active: listMode === 'all'}" @click="$router.push('/todolist/all')">全部</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import TodoInput from './components/todoInput'
// import TodoItemList from './TodoItemList.vue'
// import TodoItem from './TodoItem.vue'
import Datetime from '../../components/datetime'
import Tabbar from '../../components/tabbar.vue'
import {mapState} from 'vuex'
export default {
  name: 'todolist',
  components: {
    TodoInput,
    // TodoItemList,
    // TodoItem,
    Datetime,
    Tabbar
  },
  computed: {
    ...mapState(['listMode'])
  },
}
</script>

<style>
.header {
  display: flex;
  gap: 20px;
  align-items: center;
}
.choose-mode {
    display: flex;
    gap: 10px;
    /* border-bottom: 3px solid #5B7FA7; */
    margin-bottom: 15px;
}
.choose-mode div {
    text-align: center;
    width: 80px;
    height: 30px;
    border: 3px solid var(--list-tab-color);
    border-radius: 8px;

    font-size: 16px;
    line-height: 30px;
    cursor: pointer;
}
.choose-mode div.active {
    color: #fff;
    background-color: var(--list-tab-color);
}
</style>