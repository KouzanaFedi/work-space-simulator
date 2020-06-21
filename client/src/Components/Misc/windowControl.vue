<template>
  <v-card
    width="60"
    height="25"
    class="window-controls"
  >
    <v-btn
      color
      height="25"
      width="30"
      min-width="30"
      tile
      small
      @click="minimize"
    >
      <v-icon small>mdi-minus</v-icon>
    </v-btn>
    <v-btn
      color
      height="25"
      width="30"
      min-width="30"
      tile
      small
      @click="close"
    >
      <v-icon small>mdi-close</v-icon>
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { ipcRenderer } from 'electron'

export default Vue.extend({
  name: 'controlers' as string,
  methods: {
    close() {
      ipcRenderer.send('close-win')
    },
    minimize() {
      ipcRenderer.send('minimize-win')
    }
  }
})
</script>

<style >
.window-controls {
  position: fixed !important;
  top: 0;
  right: 0;
  margin: 8px;
}
</style>

