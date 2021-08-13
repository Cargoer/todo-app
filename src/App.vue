<template>
  <div id="app" :class="'color'+themeColor">
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
    <select name="themeColor" id="themeColor" v-model="themeColor">
      <option value="1">颜色1</option>
      <option value="2">颜色2</option>
    </select>
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
  data() {
    return {
      themeColor: 1
    }
  },
  methods: {
    goto(url) {
      this.$router.push(url)
      console.log(this.$store.state.listMode)
    },
  },
  created() {
    this.$store.commit('initItems')
    console.log("app created: multiRemove is ", this.$store.state.multiRemove)
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
#app.color1 {
  --item-bg-color: #508da3;
  --input-color: #5B7FA7;
  --list-tab-color: #3d619b;
  --complete-check-border-color: #5b7fa7;
  --complete-bg-color: #55FFF1;
  --datetime-shadow-color: #5B7FA7;
}
#app.color2 {
  --item-bg-color: #eec822;
  --input-color: #f1d63c;
  --list-tab-color: #ec9a1f;
  --complete-check-border-color: #8d5be9;
  --complete-bg-color: #46f5d8;
  --datetime-shadow-color: #f84e24;
}
.tabs {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.tabs button {
  width: 120px;
  height: 50px;
  /* padding: 15px 20px; */
  background-color: var(--list-tab-color);
  color: #fff;
  border-radius: 10px;
  cursor: pointer;

  border: none;
  outline: none;
}
/* #themeColor {
  position: absolute;

} */
</style>
