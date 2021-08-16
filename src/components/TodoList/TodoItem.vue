<template>
    <!-- <draggable> -->
    <div class="todo-item" :class="{'done-item': todo.isDone}" @click.stop="showDetail=true">
        <div v-if="!multiRemove">
            <div @click.stop="switchStatus(todo.id)" class="complete-check"></div>
        </div>
        <div v-else>
            <input 
                ref="checkbox" 
                type="checkbox" 
                @change="switchChosenStatus(todo.id)"
                :checked="removeList.indexOf(todo.id) !== -1"
            >
            <!-- <div 
                :class="['complete-check', {'chosen': removeList.indexOf(todo.id) !== -1}]"
                @click="switchChosenStatus(todo.id)"
                ref="removeCheckBox"
            ></div> -->
        </div>
        <div class="content">
            {{ todo.content }}
        </div>
        <div class="remove" @click.stop="removeTodoItem(todo.id)">
            ×
        </div>
        <!-- 设置星标 -->
        <div class="star" @click.stop="starItem(todo.id)">
            <i class="fa fa-star-o fa-lg"></i>
        </div>
        <div class="time-info">
            <div class="create-time">创建于 {{todo.createTime}}</div>
            <div v-if="todo.isDone" class="finish-time">
                <div v-if="todo.createTime === todo.finishTime">当日完成</div>
                <div v-else>完成于 {{todo.finishTime}}</div>
            </div>
        </div>

        <div class="detailPopup" :style="{display:showDetail? 'flex': 'none'}">
            <div>{{todo.content}}</div>
            <textarea name="detail" id="itemDetail" cols="30" rows="10" v-model="todoDetail"></textarea>
            <div class="closeDetail" @click.stop="showDetail=false">×</div>
        </div>
        
    </div>
    <!-- </draggable> -->
</template>

<script>
import {mapState} from 'vuex'
// import vuedraggable from 'vuedraggable'
export default {
    name: 'TodoItem',
    props: {
        todo: {
            
        }
    },
    data(){
        return {
            showDetail: false
        }
    },
    // components: {vuedraggable},
    methods: {
        switchStatus(id) {
            this.$store.commit('switchStatus', id)
            // this.$store.commit('modifyTodoItems')
            // this.$refs.check.classList.add('completed')
        },
        removeTodoItem(id) {
            this.$store.commit('removeTodoItem', id)
        },
        switchChosenStatus(id) {
            if(this.$refs.checkbox.checked) {
                console.log("add")
                this.$store.commit('addRemoveItem', id)
            }
            else {
                console.log("delete")
                this.$store.commit('deleteRemoveItem', id)
            }
        },

    },
    computed: {
        ...mapState(['multiRemove', 'removeList']),
        todoDetail: {
            get(){
                return this.$store.state.todoItems.find(item => {
                    return item.id === this.todo.id
                }).detail
            },
            set(val) {
                // console.log("detail in TodoItem val: ", val)
                this.$store.commit('updateDetail', {id: this.todo.id, val: val})
                // 添加更新detail操作
            }
        },
        detailContent: {
            get(){
                return this.$store.state.todoItems.find(item => {
                    return item.id === this.todo.id
                }).content
            },
            set(val) {
                this.$store.state.todoItems.map(item => {
                    if(item.id === this.todo.id){
                        item.content = val
                    }
                    return item
                })
            }
        }
    }
    
}
</script>

<style>
.todo-item {
    display: flex;
    gap: 10px;

    width: 440px;
    height: 50px;
    padding: 10px 15px;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 10px;
    background-color: var(--item-bg-color);
    border-radius: 8px;
    position: relative;
}
.complete-check {
    width: 1.2em;
    height: 1.2em;
    border: 3px solid var(--complete-check-border-color);
    border-radius: 50%;
    background-color: #fff;
}
input[type=checkbox] {
    width: 1.2em;
    height: 1.2em;
}
.content {
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 360px;
    transform: translateY(-8px);
}
.done-item .complete-check {
    background-color: var(--complete-bg-color);
    position: relative;
}
.done-item .complete-check::after {
    content: '✔';
    color: #fff;
    text-align: center;
    line-height: 100%;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.remove {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 15px;
    font-size: 30px;
    color: #fff;
}
.star {
    position: absolute;
    right: 1.5em;
}
.done-item .content {
    text-decoration: line-through;
}
.done-item .remove {
    pointer-events: none;
    color: grey;
}
.time-info {
    position: absolute;
    left: 50px;
    bottom: 8px;
    font-size: 8px;
    color: #fff;
    display: flex;
    gap: 10px;
}
.chosen {
    background-color: #55FFF1;
}
.detailPopup {
    color: #fff;
    width: 440px;
    height: 400px;
    border-radius: 15px;
    background-color: #508da3;
    border: 2px solid #fff;
    display: none;
    flex-direction: column;
    padding: 20px;
    gap: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    transition: .5s;
}
.detailPopup #itemDetail {
    outline: none;
    border: none;
    background-color: #508da3;
    font-size: 14px;
}
.detailPopup .closeDetail {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}
.detailPopup #detailContent {
    outline: none;
    border: none;
    background-color: #508da3;
    color: #fff;
}
</style>