<template>
  <div>
    <TodoItemParent
      :todoItem="todoItem"
      :index="index"
      :todosCount="todosCount"
      @titleTaskChanged="handleAddedDescription"
      @deleteTask="deleteTask"
      @moveUp="moveUp"
      @moveDown="moveDown"
    />
    <div v-if="todoItem.children.length>0">
      <TodoItemChild
        v-for="(child,j) in todoItem.children"
        :key="j"
        :todoItemChild="child"
        :index="j"
        @deleteChildTask="deleteChildTask"
        @titleChildTaskChanged="updateChildTask"
        :childrenCount="todoItem.children.length"
        @moveChildDown="moveChildDown"
        @moveChildUp="moveChildUp"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import TodoItem from '../../interfaces/todo-list-manager/TodoItem'
import Update from '../../interfaces/todo-list-manager/Update'
import TodoItemChild from '@/Components/todo-list-manager/TodoItemChild.vue'
import TodoItemParent from '@/Components/todo-list-manager/TodoItemParent.vue'


export default Vue.extend({
  name: 'TodoItem' as string,
  props: {
    todoItem: {
      type: Object as PropType<TodoItem>,
    },
    index: Number,
    todosCount: Number
  }, components: {
    TodoItemChild,
    TodoItemParent
  },
  data() {
    return {
      editDialog: false
    }
  },
  methods: {
    handleAddedDescription(description: string) {
      const update = {
        description,
        index: this.index
      }
      this.$emit('titleTaskChanged', update)
    },
    deleteTask() {
      this.$emit('deleteTask', this.index)
    },
    moveUp() {
      this.$emit('moveUp', this.index)
    },
    moveDown() {
      this.$emit('moveDown', this.index)
    },
    deleteChildTask(index: number) {
      if (this.todoItem.children.length <= 0) return
      this.todoItem.children.splice(index, 1)
    },
    updateChildTask(update: Update) {
      const { description, index } = update
      this.todoItem.children[index].title = description
    },
    moveChildUp(index: number) {
      if (index <= 0) return

      const prevI = index - 1
      this.todoItem.children.splice(prevI, 2, this.todoItem.children[index], this.todoItem.children[prevI])
    },
    moveChildDown(index: number) {
      if (index >= this.todoItem.children.length) return

      const nextI = index + 1
      this.todoItem.children.splice(index, 2, this.todoItem.children[nextI], this.todoItem.children[index]);
    },
    createChild(task: string) {
      const childTask = {
        title: task,
        done: false
      }
      this.todoItem.children.push(childTask)
    }
  }
})
</script>
