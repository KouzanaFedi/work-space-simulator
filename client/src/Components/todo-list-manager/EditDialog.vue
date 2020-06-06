<template>
  <v-dialog
    v-model="active"
    width="350px"
    persistent
  >
    <v-container>
      <v-textarea
        label="Task description"
        v-model="taskDescription"
        :rules="[rules.required]"
        auto-grow
        clearable
        :counter="maxChars"
        dense
        rows=1
        type="text"
        filled
        :value="description"
      >

      </v-textarea>
    </v-container>

    <v-container>
      <v-row justify="space-between">
        <v-btn
          @click="close"
          color="error"
          class="ml-5"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>

        <v-btn
          color="success"
          class="mr-5"
          @click="submit"
        >
          <v-icon>
            mdi-check
          </v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EditDialog' as string,
  data() {
    return {
      active: false,
      taskDescription: '',
      maxChars: 64,
      rules: {
        required: (value: string) => !!value || 'Required'
      },
      edit: false,
      createChild: false,
      createParent: false
    }
  },
  props: {
    description: String
  },
  methods: {
    editDialogToggle() {
      this.active = !this.active;
      this.editMode()
    },
    createChildDialogToggle() {
      this.active = !this.active;
      this.createChildMode()
    },
    createParentDialogToggle() {
      this.active = !this.active;
      this.createParentdMode()
    },
    editMode() {
      this.edit = true
      this.createChild = false
      this.createParent = false
      this.taskDescription = this.description
    },
    createChildMode() {
      this.edit = false
      this.createChild = true
      this.createParent = false
      this.taskDescription = ''
    },
    createParentdMode() {
      this.edit = false
      this.createChild = false
      this.createParent = true
      this.taskDescription = ''
    },
    inputCheck() {
      if (this.taskDescription == null) return false
      return !!this.taskDescription && this.taskDescription.length <= this.maxChars
    },
    submit() {
      if (this.inputCheck()) {
        if (this.edit) {
          this.$emit('addedDescription', this.taskDescription.trim())
          this.deactivate()
          return
        }
        if (this.createChild) {
          this.$emit('createChildTask', this.taskDescription.trim())
          this.deactivate()
          return
        }
        if (this.createParent) {
          this.$emit('createParentTask', this.taskDescription.trim())
          this.deactivate()
          return
        }
      }
    }, close() {
      this.deactivate()
      this.taskDescription = this.description
    },
    deactivate() {
      this.active = false
    }
  }
})
</script>

<style lang="scss" scoped>
</style>