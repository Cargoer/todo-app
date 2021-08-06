<template>
    <div class="todo-input">
        <div class="input-content" @keyup.enter="addTodoItem">
            <input type="text" v-model.trim="newTodoText" maxlength="100" :disabled="multiRemove">
            <button @click="addTodoItem">+</button>
        </div>
        <!-- <div class="choose-mode">
            <input type="radio" value="notdone" id="notdone" v-model="listMode">
            <label for="notdone" :class="{active: listMode === 'notdone'}">未完成</label>
            <input type="radio" value="done" id="done" v-model="listMode">
            <label for="done" :class="{active: listMode === 'done'}">已完成</label>
            <input type="radio" value="all" id="all" v-model="listMode">
            <label for="all" :class="{active: listMode === 'all'}">全部</label>
        </div> -->
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    methods: {
        addTodoItem() {
            this.$store.commit('addTodoItem');
        }
    },
    computed: {
        // 当与元素通过v-model进行双向数据绑定时，需要同时设置getter和setter
        newTodoText: {
            get() {
                return this.$store.state.newTodoText
            },
            set(val) {
                this.$store.state.newTodoText = val
            }
        },
        listMode: {
            get() {
                return this.$store.state.listMode
            },
            set(val) {
                this.$store.state.listMode = val
                console.log(val)
            }
        },
        ...mapState(['multiRemove'])
    }
}
</script>

<style>
.todo-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}
.input-content {
    width: 400px;
    height: 40px;
    position: relative;
    /* background-color: ; */
    padding: 10px 20px;
    border-radius: 40px;
    border: 3px solid var(--input-color);
    
}
.input-content input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 20px;
    line-height: 40px;
    
}
.input-content button {
    cursor: pointer;
    width: 60px;
    height: 60px;
    font-size: 30px;
    color: #fff;
    line-height: 60px;
    text-align: center;

    position: absolute;
    right: 0;
    top: 0;

    font-weight: bold;
    background-color: var(--input-color);
    border: none;
    border-radius: 50%;
}
/* .choose-mode {
    display: flex;
    gap: 10px;
}
.choose-mode input {
    display: none;
}
.choose-mode label {
    text-align: center;
    width: 80px;
    height: 30px;
    border: 3px solid #5B7FA7;
    border-radius: 8px;

    font-size: 16px;
    line-height: 30px;
}
.choose-mode label.active {
    color: #fff;
    background-color: #5B7FA7;
} */
</style>