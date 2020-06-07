<template>
  <v-card
    class="d-flex mt-2 float-right"
    max-width="426"
    min-width="426"
    elevation="20"
    style="position: relative;"
    min-height="80px"
  >

    <v-card-text class="py-0">
      <v-container>
        <v-checkbox v-model="todoItemChild.done">
          <template slot="label">
            <div class="text-wrap">
              <label for>
                {{todoItemChild.title}}
              </label>
            </div>
          </template>
        </v-checkbox>
      </v-container>
    </v-card-text>

    <v-btn
      absolute
      right
      icon
      fab
      x-small
      @click="deleteTask"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card-actions class="action-buttons">
      <v-btn
        x-small
        fab
        icon
        :disabled="disabledDown"
        @click="moveChildDown"
      >
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>

      <v-btn
        x-small
        fab
        icon
        :disabled="disabledUp"
        @click="moveChildUp"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>

      <v-btn
        x-small
        icon
        fab
        @click="toggle"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>

    <EditDialog
      ref="editChildDialog"
      :description="todoItemChild.title"
      @addedDescription="handleAddedDescription"
    />
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import TodoItemChild from '../../interfaces/todo-list-manager/TodoItemChild'
import EditDialog from '@/Components/todo-list-manager/EditDialog.vue'
import Update from '../../interfaces/todo-list-manager/Update'

export default Vue.extend({
  name: 'TodoItemChild' as string,
  components: {
    EditDialog
  },
  props: {
    todoItemChild: {
      type: Object as PropType<TodoItemChild>
    },
    index: Number,
    childrenCount: Number
  },
  data() {
    return {
      editDialog: false
    }
  },
  methods: {
    toggle() {
      (this.$refs.editChildDialog as Vue & { editDialogToggle: () => boolean }).editDialogToggle()
    },
    deleteTask() {
      this.$emit('deleteChildTask', this.index)
    },
    handleAddedDescription(description: Update) {
      const update = {
        description,
        index: this.index
      }
      this.$emit('titleChildTaskChanged', update)
    },
    moveChildUp() {
      this.$emit('moveChildUp', this.index)
    },
    moveChildDown() {
      this.$emit('moveChildDown', this.index)
    },
  },
  computed: {
    disabledUp() {
      if (this.index <= 0) return true
      else return false
    },
    disabledDown() {
      if (this.index >= this.childrenCount - 1) return true
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
  max-width: 70% !important;
  overflow: hidden;
  display: inline-block !important;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
</style>