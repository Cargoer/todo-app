import Vue from "vue";
import Vuex from "vuex";
import Airtable from 'airtable'
Vue.use(Vuex);

// 获取airtable的GTDRecord state.base
// var base = new Airtable({apiKey: 'keyZ4ydi5sz7NHOIZ'}).state.base('appSszMoXtHrRBupD');
// var todoTable = base('todolist')

const store = new Vuex.Store({
  state: {
    // count: -1,
    todoItems: [],
    listMode: 'notdone',
    newTodoText: '',
    multiRemove: false,
    removeList: [],
    base: new Airtable({apiKey: 'YOU_API_KEY'}).base('appSszMoXtHrRBupD')
  },
  getters: {
    getDoneTodoItems(state) {
      return state.todoItems.filter(item => item.isDone);
    },
    getNotDoneTodoItems(state) {
      return state.todoItems.filter(item => !item.isDone);
    },
  },
  mutations: {
    /* todo项操作相关 */ 
    addTodoItem(state){
      if(!state.multiRemove){
        if(state.newTodoText){
          let date = new Date();
          let newTodo = {
            // id: state.count++,
            content: state.newTodoText,
            isDone: false,
            createTime: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
            finishTime: null,
            detail: ''
          }
          
          // 把新的todo项加入airtable里
          state.state.base('todolist').create(newTodo, (err, record) => {
              if(err) {
                console.log("create: ", err);
                return;
              }
              // 获取插入操作产生的唯一id
              let record_id = record.getId()
              newTodo.id = record_id
              // 把新的todo项加入state里（加上id）
              state.todoItems.unshift(newTodo)
              // 更新airtable里的id
              state.state.base('todolist').update(record_id, {
                "id": record_id
              }, (err, record) => {
                if(err) {
                  console.log("update_id: ", err)
                  return
                }
                console.log("updated_id: ", record.get('id'))
              })
              console.log("record_id: ", record_id)
          })
          
          
        }
        state.newTodoText = ''
      }
    },
    removeTodoItem(state, id){
      state.todoItems = state.todoItems.filter(item => {
        return item.id !== id;
      })
      state.state.base('todolist').destroy([id])
    },
    // 更改todo项的完成状态
    switchStatus(state, id){
      let firstDonePos = -1, toMoveItemPos = -1
      let date = new Date();
      let finish_time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
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
            item.finishTime = finish_time;
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

      // 在airtable里更新
      state.base('todolist').update(id, {
        "isDone": true,
        "finishTime": finish_time,
      })
    },
    // 更新todo项的detail
    updateDetail(state, payload) {
      state.todoItems.map(item => {
        if(item.id === payload.id){
            item.detail = payload.val
        }
        return item
      })
      state.base('todolist').update(payload.id, {
        "detail": payload.val
      }, (err) => {
        if(err){
          console.log("err: ", err)
        }
        // console.log("update detail success!")
      })
      console.log(state.todoItems)
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
        if(state.removeList.indexOf(item.id) !== -1) {
          state.base('todolist').destroy([item.id])
        }
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
    // initItems(state) {
    //   let ls_items = JSON.parse(localStorage.getItem('todoItems'))
    //   state.todoItems = ls_items? ls_items: []
    //   if(!state.todoItems.length){
    //     state.count = 0
    //   }
    //   else{
    //     let id_list = state.todoItems.map(item => item.id)
    //     state.count = Math.max(...id_list)+1
    //   }
    // },
    // storeItems(state) {
    //   state.todoItems = state.todoItems.map(item => {
    //     if(item.detail === undefined){
    //       item.detail = ''
    //     }
    //     return item
    //   })
    //   localStorage.setItem('todoItems', JSON.stringify(state.todoItems))
    // }

    /* airtable相关 */
    initItems(state) {
      state.base('todolist')
      .select({
        view: "Grid view",
      })
      .firstPage((err, records) => { // eachPage?
        if(err) {
          console.log(err);
          return;
        }
        state.todoItems = records.map(item => item.fields)
      })
    },
    // storeItems(state) {
    //   state.todoItems.forEach(item => {
    //     state.base('todolist').create([
    //       {
    //         "fields": {
    //           "id": item.id,
    //           "content": item.content,
    //           "isDone": item.isDone,
    //           "createTime": item.createTime,
    //           "finishTime": item.finishTime,
    //           "detail": item.detail,
    //         }
    //       }
    //     ])
    //   })
    // }
    initBase(state, payload) {
      state.base = new Airtable({apiKey: payload.api_key}).base(payload.base_key)
    }
  },
})

export default store