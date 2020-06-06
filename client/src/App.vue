<template>
  <v-app>
    <Home />
    <TodoList />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from '@/views/Home.vue';
import TodoList from '@/components/todo-list-manager/TodoList.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Home,
    TodoList
  }
});
</script>

<style>
#app {
  background-color: var(--v-background-base);
}
.v-card {
  background-color: var(--v-cardBackground-base) !important;
}
</style>
