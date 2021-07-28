import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 1,
    todoItems: [
      {
        id: 0,
        content: "记账",
        isDone: false,
        createTime: '2020/5/6',
        finishTime: null
      }
    ],
    listMode: 'notdone',
    newTodoText: '',
    multiRemove: false,
    removeList: []
  },
  getters: {
    getDoneTodoItems(state) {
      return state.todoItems.filter(item => item.isDone);
    },
    getNotDoneTodoItems(state) {
      return state.todoItems.filter(item => !item.isDone);
    },
    getTodoItems(state) {
      return state.todoItems;
    },
    getListMode(state) {
      return state.listMode;
    },
    getNewTodoText(state){
      return state.newTodoText;
    }
  },
  mutations: {
    addTodoItem(state){
      if(!state.multiRemove){
        let date = new Date()
        if(state.newTodoText){
          state.todoItems.unshift({
            id: state.count++,
            content: state.newTodoText,
            isDone: false,
            createTime: date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(),
            finishTime: null
          })
        }
        state.newTodoText = ''
      }
    },
    addRemoveItem(state, id){
      state.removeList.push(id);
      console.log(state.removeList)
    },
    deleteRemoveItem(state, id){
      state.removeList = state.removeList.filter(item => {
        return item.id !== id;
      })
    },
    clearRemoveList(state) {
      state.removeList = [];
    },
    removeTodoItem(state, id){
      state.todoItems = state.todoItems.filter(item => {
        return item.id !== id;
      })
    },
    removeMultipleItems(state){
      state.todoItems = state.todoItems.filter(item => {
        return state.removeList.indexOf(item.id) === -1;
      })
    },
    switchStatus(state, id){
      state.todoItems = state.todoItems.map((item, index) => {
        console.log(index)
        // item.id === id && (item.isDone = !item.isDone)
        if(item.id === id){
          item.isDone = !item.isDone;
          if(item.isDone){
            let date = new Date();
            item.finishTime = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
          }
        }
        // item.isDone = item.id === id? !item.isDone: item.isDone;
        return item;
      })
    },
    switchMultiRemove(state) {
      state.multiRemove = !state.multiRemove
    },
    selectAllItems(state) {
      if(state.todoItems.length !== state.removeList.length){
        state.removeList = state.todoItems.map(item => {
          return item.id
        })
      }
      else {
        state.removeList = []
      }
      console.log(state.removeList.length)
    }
  },
})

export default store