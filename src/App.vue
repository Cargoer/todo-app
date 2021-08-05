<template>
  <div id="app" >
    <!-- <div class="header">
      <h1>待办事项</h1>
      <Datetime />
    </div>
    
    <TodoInput />
    <TodoList /> -->
    <div class="tabs">
      <button @click="goto('/collection')">Collection</button>
      <button @click="goto('/todolist')">Todo List</button>
      <button @click="goto('/programlist')">Program List</button>
      <button @click="goto('/wishlist')">Wish List</button>
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
  methods: {
    goto(url) {
      this.$router.push(url)
      console.log(this.$store.state.listMode)
    }
  },
  created() {
    this.$store.commit('initItems')
  },
  // updated() {
  //   this.$store.commit('storeItems')
  //   alert(localStorage.getItem('todoItems'))
  // }
}
</script>

<style>
#app {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  cursor: pointer;
}
</style>
