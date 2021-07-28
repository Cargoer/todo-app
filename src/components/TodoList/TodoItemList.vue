<template>
    <div v-if="curTodoList.length">
        <div class="multi-remove-option">
            <div v-if="!multiRemove" class="button" @click="switchMultiRemove">批量移除</div>
            <div v-else class="flex-row">
                <div class="button" @click="switchMultiRemove">完成</div>
                <div>
                    <input 
                        type="checkbox" 
                        id="remove-all" 
                        @change="selectAllItems"
                    >
                    <!-- checked="todoItems.length && todoItems.length === removeList.length" -->
                    <label for="remove-all">全选</label>
                </div>
                <div class="button" @click="removeMultipleItems">移除</div>
                
            </div>
        </div>
        <div v-if="listMode === 'all'" class="list">
            <vuedraggable>
                <transition-group name="list" tag="p">
                    <TodoItem
                        v-for="todoItem in todoItems"
                        :key="todoItem.id"
                        :todo="todoItem"
                    />
                </transition-group>
            </vuedraggable>
            <!-- <TodoItem
                v-for="todoItem in todoItems"
                :key="todoItem.id"
                :todo="todoItem"
            /> -->
        </div>
        <div v-if="listMode === 'done'" class="list">
            <transition-group name="list" tag="p">
                <TodoItem
                    v-for="todoItem in getDoneTodoItems"
                    :key="todoItem.id"
                    :todo="todoItem"
                />
            </transition-group>
            
        </div>
        <div v-if="listMode === 'notdone'" class="list">
            <transition-group name="list" tag="p">
                <TodoItem
                    v-for="todoItem in getNotDoneTodoItems"
                    :key="todoItem.id"
                    :todo="todoItem"
                />
            </transition-group>
            <!-- <TodoItem
                v-for="todoItem in getNotDoneTodoItems"
                :key="todoItem.id"
                :todo="todoItem"
            /> -->
        </div>
    </div>
    <div v-else class="empty">
        <div v-if="listMode === 'done'">
            Try to finish a todo item!
        </div>
        <div v-else>
            Try to add a new todo item!
        </div>
        
    </div>
</template>

<script>
import TodoItem from './TodoItem'
import { mapState, mapGetters } from 'vuex'
import vuedraggable from 'vuedraggable'

export default {
    components: {TodoItem, vuedraggable},
    computed: {
        ...mapState(['todoItems', 'listMode', 'multiRemove', 'removeList']),
        ...mapGetters(['getDoneTodoItems', 'getNotDoneTodoItems']),
        curTodoList() {
            switch (this.listMode){
                case 'all':
                    return this.todoItems;
                case 'done':
                    return this.getDoneTodoItems;
                case 'notdone':
                    return this.getNotDoneTodoItems;
                default:
                    return [];
            }
        }
    },
    methods: {
        switchMultiRemove() {
            this.$store.commit('switchMultiRemove')
            this.$store.commit('clearRemoveList')
        },
        removeMultipleItems() {
            this.$store.commit('removeMultipleItems')
        },
        selectAllItems() {
            this.$store.commit('selectAllItems')
        }
    },
    watch: {
        todoItems: function(){
            if(this.todoItems.length === 0){
                this.switchMultiRemove()
            }
        }
    }
}
</script>

<style>
.list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.list-enter-active, .list-leave-active {
    transition: all .1s;
}
.list-enter, .list-leave-to {
    opacity: 0;
}
.list-move {
    transition: transform 1s;
}
.button {
    cursor: pointer;
}
.flex-row {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>