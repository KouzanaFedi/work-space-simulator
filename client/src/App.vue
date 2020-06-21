<template>
  <v-app>
    <v-content class="pa-5">
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    //
  })
});
</script>

<style>
#app {
  /* background-color: var(--v-background-base); */
}
.v-card {
  /*  background-color: var(--v-cardBackground-base) !important;*/
}
body,
html {
  overflow: hidden !important;
}
</style>