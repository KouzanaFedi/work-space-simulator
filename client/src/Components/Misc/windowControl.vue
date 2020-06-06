<template>
  <v-card width="60" height="25" class="window-controls">
    <v-btn color height="25" width="30" min-width="30" tile small>
      <v-icon small>mdi-minus</v-icon>
    </v-btn>
    <v-btn color height="25" width="30" min-width="30" tile small>
      <v-icon small>mdi-close</v-icon>
    </v-btn>
  </v-card>
</template>

<style >
.window-controls {
  position: fixed !important;
  top: 0;
  right: 0;
  margin: 8px;
}
</style>

