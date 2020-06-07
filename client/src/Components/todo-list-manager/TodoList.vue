<template>
  <v-menu
    :close-on-content-click="false"
    offset-x
  >
    <template v-slot:activator="{on}">
      <v-btn
        style="z-index:10"
        color
        fab
        icon
        v-on="on"
      >
        <v-icon small>mdi-playlist-check</v-icon>
      </v-btn>
    </template>
    <vue-draggable-resizable
      :resizable="false"
      :parent="true"
    >

      <v-card
        class="mx-auto d-flex align-end flex-column no-scroll"
        max-width="550"
        min-width="550"
        max-height="650"
        min-height="650"
        elevation="15"
      >

        <v-container
          class="scroll d-flex flex-column"
          v-if="todos.length>0"
        >
          <TodoItem
            v-for="(todo,i) in todos"
            :key="i"
            :todoItem="todo"
            :index="i"
            :todosCount="todos.length"
            @titleTaskChanged="updateTask"
            @deleteTask="deleteTask"
            @moveUp="moveUp"
            @moveDown="moveDown"
          />
        </v-container>
        <p style="height: 60px"></p>

        <EditDialog
          ref="editDialog"
          @createParentTask="createParent"
          :description="''"
        />
        <v-card-actions class="card-actions pa-0 ">

          <v-container class="px-5">
            <v-row justify="space-between">
              <v-btn>
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
              Todo List
              <span v-if="todos.length>0">
                {{tasksDone}}/{{todos.length}}
              </span>
              <v-btn
                class="primary"
                @click="toggleCreate"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </vue-draggable-resizable>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoItem from '@/Components/todo-list-manager/TodoItem.vue'
import TodoItemC from '../../interfaces/todo-list-manager/TodoItem'
import Update from '../../interfaces/todo-list-manager/Update'
import EditDialog from '@/Components/todo-list-manager/EditDialog.vue'
import VueDraggableResizable from 'vue-draggable-resizable'

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
      this.todos.push(parent)
    },
  },
  computed: {
    tasksDone(): number {
      const init = 0
      const reducer = (accu: number, item: TodoItemC) => {
        if (item.done) {
          return ++accu
        } else return accu
      }
      return this.todos.reduce(reducer, init)
    },
    wWidth() {
      console.log(window.innerWidth)
      return window.innerWidth
    },
    wHeight() {
      console.log(window.innerHeight)
      return window.innerHeight
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

.no-scroll {
  overflow: hidden;
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

.card-actions {
  position: absolute;
  bottom: 0;
  background-color: #202020;
  width: 550px;
  z-index: 5;
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0 -5px 0 0px rgba($color: rgb(71, 71, 71), $alpha: 0.1);
}

.v-menu__content {
  max-width: 100vw !important;
  max-height: 100vh !important;
  width: 100vw !important;
  height: 100vh !important;
}
</style>