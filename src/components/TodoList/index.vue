<template>
  <div id="todo-list" >
    <div class="header">
      <h1>待办事项</h1>
      <Datetime />
    </div>
    
    <TodoInput />
    <TodoItemList />
    
  </div>
</template>

<script>
import TodoInput from './TodoInput.vue'
import TodoItemList from './TodoItemList.vue'
import TodoItem from './TodoItem.vue'
import Datetime from '../Datetime.vue'
export default {
  name: 'todolist',
  components: {
    TodoInput,
    TodoItemList,
    TodoItem,
    Datetime
  }
}
</script>

<style>
.header {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>