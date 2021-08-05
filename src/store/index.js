import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: -1,
    todoItems: [],
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
    // getTodoItems(state) {
    //   return state.todoItems;
    // },
    // getListMode(state) {
    //   return state.listMode;
    // },
    // getNewTodoText(state){
    //   return state.newTodoText;
    // }
  },
  mutations: {
    /* todo项操作相关 */ 
    addTodoItem(state){
      if(!state.multiRemove){
        let date = new Date()
        if(state.newTodoText){
          state.todoItems.unshift({
            id: state.count++,
            content: state.newTodoText,
            isDone: false,
            createTime: date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(),
            finishTime: null,
            detail: ''
          })
        }
        state.newTodoText = ''
      }
    },
    removeTodoItem(state, id){
      state.todoItems = state.todoItems.filter(item => {
        return item.id !== id;
      })
    },
    // 更改todo项的完成状态
    switchStatus(state, id){
      let firstDonePos = -1, toMoveItemPos = -1
      // 改变todo项的完成状态
      state.todoItems = state.todoItems.map((item, index) => {
        if(firstDonePos === -1 && item.isDone){
          firstDonePos = index
        }
        // item.isDone = item.id === id? !item.isDone: item.isDone;
        // item.id === id && (item.isDone = !item.isDone)
        if(item.id === id){
          toMoveItemPos = index
          item.isDone = !item.isDone;
          if(item.isDone){
            let date = new Date();
            item.finishTime = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
          }
        }
        return item;
      })
      // 调整todo项在all列表的位置
      let toMoveItem = state.todoItems[toMoveItemPos]
      if(toMoveItem.isDone){
        if(firstDonePos === -1){
          state.todoItems.push(toMoveItem)
        }
        else{
          state.todoItems.splice(firstDonePos, 0, toMoveItem)
        }
        state.todoItems.splice(toMoveItemPos, 1)
      }
      else {
        state.todoItems.splice(toMoveItemPos, 1)
        state.todoItems.unshift(toMoveItem)
      }
    },
    
    /* 批量移除相关 */
    // 移除列表增加要移除的todo项
    addRemoveItem(state, id){
      state.removeList.push(id);
    },
    // 移除列表删除误要移除的todo项
    deleteRemoveItem(state, id){
      state.removeList = state.removeList.filter(item => {
        return item.id !== id;
      })
    },
    // 清空移除列表
    clearRemoveList(state) {
      state.removeList = [];
    },
    // 批量移除
    removeMultipleItems(state){
      state.todoItems = state.todoItems.filter(item => {
        return state.removeList.indexOf(item.id) === -1;
      })
    },
    // 切换批量移除模式
    switchMultiRemove(state) {
      state.multiRemove = !state.multiRemove
    },
    // 全选
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
    },
    setListMode(state, listMode) {
      state.listMode = listMode
    },

    /* localStorage和初始化相关 */
    initItems(state) {
      let ls_items = JSON.parse(localStorage.getItem('todoItems'))
      state.todoItems = ls_items? ls_items: []
      if(!state.todoItems.length){
        state.count = 0
      }
      else{
        let id_list = state.todoItems.map(item => item.id)
        state.count = Math.max(...id_list)+1
      }
    },
    storeItems(state) {
      state.todoItems = state.todoItems.map(item => {
        if(item.detail === undefined){
          item.detail = ''
        }
        return item
      })
      localStorage.setItem('todoItems', JSON.stringify(state.todoItems))
    }

    // modifyTodoItems(state, getters){
    //   state.todoItems = [...getters.getNotDoneTodoItems, ...getters.getDoneTodoItems]
    // }
  },
})

export default store