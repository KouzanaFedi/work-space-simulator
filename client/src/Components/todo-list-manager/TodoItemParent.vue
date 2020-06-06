<template>
  <v-card
    class="d-flex mx-auto "
    min-width="486"
    elevation="20"
    style="position: relative;"
    height="90px"
  >
    <v-card-text class="py-0">
      <v-checkbox
        class="wrap-text ml-auto"
        v-model="todoItem.done"
        :label="todoItem.title"
      > </v-checkbox>
    </v-card-text>
    <v-btn
      absolute
      top
      right
      color="red"
      fab
      x-small
      @click="deleteTask"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <v-card-actions class="action-buttons">

      <v-btn
        x-small
        fab
        :disabled="disabledDown"
        @click="moveDown"
      >
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>

      <v-btn
        x-small
        fab
        @click="moveUp"
        :disabled="disabledUp"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>

      <v-btn
        x-small
        fab
        @click="toggleEdit"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn
        x-small
        fab
        @click="toggleCreate"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
    <EditDialog
      ref="editDialog"
      @addedDescription="handleAddedDescription"
      @createChildTask="createChild"
      :description="todoItem.title"
    />
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { TodoItem } from '../../interfaces/todo-list-manager/TodoItem'
import EditDialog from '@/Components/todo-list-manager/EditDialog.vue'


export default Vue.extend({
  name: 'TodoItemParent' as string,
  props: {
    todoItem: {
      type: Object as PropType<TodoItem>,
    },
    index: Number,
    todosCount: Number
  }, components: {
    EditDialog
  },
  data() {
    return {
      editDialog: false
    }
  },
  methods: {
    toggleEdit() {
      (this.$refs.editDialog as Vue & { editDialogToggle: () => boolean }).editDialogToggle()
    },
    toggleCreate() {
      (this.$refs.editDialog as Vue & { createChildDialogToggle: () => boolean }).createChildDialogToggle()
    },
    handleAddedDescription(description: string) {
      this.$emit('titleTaskChanged', description)
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
    createChild(task: string) {
      const childTask = {
        title: task,
        done: false
      }
      this.todoItem.children.push(childTask)
    }
  },
  computed: {
    disabledUp() {
      if (this.index <= 0) return true
      else return false
    },
    disabledDown() {
      if (this.index >= this.todosCount - 1) return true
      else return false
    }
  }
})
</script>

<style lang="scss" scoped>
.action-buttons {
  position: absolute;
  right: 0;
  bottom: 0;
}

.wrap-text {
  max-width: 100% !important;
  overflow: hidden;
  display: inline-block !important;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>