<template>
  <div id="app" >
    <!-- <div class="header">
      <h1>待办事项</h1>
      <Datetime />
    </div>
    
    <TodoInput />
    <TodoList /> -->
    <div class="tabs">
      <button @click="$router.push('/collection')">Collection</button>
      <button @click="$router.push('/todolist')">Todo List</button>
      <button @click="$router.push('/programlist')">Program List</button>
      <button @click="$router.push('/wishlist')">Wish List</button>
    </div>
    <router-view></router-view>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    // TodoInput,
    // TodoList,
    // Datetime,
    
  },
}
</script>

<style>
#app {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.tabs {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.tabs button {
  width: 150px;
  height: 60px;
  background-color: #3d619b;
  color: #fff;
  border-radius: 10px;
}
</style>
