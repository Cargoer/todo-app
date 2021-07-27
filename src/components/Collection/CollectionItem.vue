<template>
    <div class="collection-item">
        <!-- <div v-if="!multiRemove">
             <div @click="switchStatus(todo.id)" class="complete-check"></div> 
        </div> -->
        <div v-if="multiRemove">
            <input 
                ref="checkbox" 
                type="checkbox" 
                @change="switchChosenStatus(todo.id)"
                :checked="removeList.indexOf(todo.id) !== -1"
            >
        </div>
        <div class="content">
            {{ todo.content }}
        </div>
        <div class="remove" @click="removeTodoItem(todo.id)">
            ×
        </div>
        <div class="create-time">创建于 {{todo.createTime}}</div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'TodoItem',
    props: {
        todo: {
            
        }
    },
    methods: {
        switchStatus(id) {
            this.$store.commit('switchStatus', id)
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
        ...mapState(['multiRemove', 'removeList'])
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
    background-color: #508da3;
    border-radius: 8px;
    position: relative;
}
.complete-check {
    width: 1.2em;
    height: 1.2em;
    border: 3px solid #5b7fa7;
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
    background-color: #55FFF1;
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
.done-item .content {
    text-decoration: line-through;
}
.done-item .remove {
    pointer-events: none;
    color: grey;
}
.create-time {
    position: absolute;
    left: 50px;
    bottom: 8px;
    font-size: 8px;
    color: #fff;
}
.chosen {
    background-color: #55FFF1;
}
</style>