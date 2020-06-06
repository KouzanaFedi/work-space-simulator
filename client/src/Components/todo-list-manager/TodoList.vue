<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{on}">
      <v-btn
        color
        fab
        icon
        v-on="on"
      >
        <v-icon small>mdi-playlist-check</v-icon>
      </v-btn>
    </template>

    <v-card
      class="mx-auto d-flex align-end flex-column scroll"
      max-width="550"
      max-height="750"
      elevation="15"
    >
      <v-toolbar
        dense
        class="mx-auto mb-3"
        min-width="500"
      >
        <v-toolbar-title>
          Todo-list
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn>Cancel</v-btn>
          <v-btn
            class="primary"
            @click="toggleCreate"
          >Create</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <div v-if="todos.length>0">
        <v-container
          v-for="(todo,i) in todos"
          :key="i"
        >
          <TodoItem
            :todoItem="todo"
            :index="i"
            :todosCount="todos.length"
            @titleTaskChanged="updateTask"
            @deleteTask="deleteTask"
            @moveUp="moveUp"
            @moveDown="moveDown"
          />
        </v-container>
      </div>
      <EditDialog
        ref="editDialog"
        @createParentTask="createParent"
        :description="''"
      />
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoItem from '@/Components/todo-list-manager/TodoItem.vue'
import Update from '../../interfaces/todo-list-manager/Update'
import EditDialog from '@/Components/todo-list-manager/EditDialog.vue'

export default Vue.extend({
  name: 'TodoList' as string,
  components: {
    TodoItem,
    EditDialog
  }, methods: {
    toggleCreate() {
      (this.$refs.editDialog as Vue & { createParentDialogToggle: () => boolean }).createParentDialogToggle()
    },
    updateTask(update: Update) {
      const { description, index } = update
      this.todos[index].title = description
    },
    deleteTask(index: number) {
      if (this.todos.length <= 0) return
      this.todos.splice(index, 1)
    },
    moveUp(index: number) {
      if (index <= 0) return

      const prevI = index - 1
      this.todos.splice(prevI, 2, this.todos[index], this.todos[prevI])
    },
    moveDown(index: number) {
      if (index >= this.todos.length) return

      const nextI = index + 1
      this.todos.splice(index, 2, this.todos[nextI], this.todos[index])
    },
    createParent(task: string) {
      const parent = {
        title: task,
        done: false,
        children: []
      }
      console.log(parent);

      this.todos.push(parent)
    }
  },
  data() {
    return {
      todos: [{
        title: "todo 1",
        done: false,
        children: [{
          title: "todo1.1",
          done: false
        },
        {
          title: "todo1.2",
          done: true
        },
        {
          title: "todo1.3",
          done: false
        }
        ]
      },
      {
        title: "todo 2",
        done: true,
        children: []
      },
      {
        title: "todo 3",
        done: true,
        children: [{
          title: "todo1.1",
          done: true
        },
        {
          title: "todo1.2",
          done: true
        }
        ]
      }
      ]
    }
  }

})
</script>

<style lang="scss" scoped>
.scroll {
  overflow: auto;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(56, 46, 46, 0.3);
  box-shadow: inset 0 0 6px rgba(56, 46, 46, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(58, 53, 53, 0.5);
  box-shadow: inset 0 0 6px rgba(58, 53, 53, 0.5);
}
</style>