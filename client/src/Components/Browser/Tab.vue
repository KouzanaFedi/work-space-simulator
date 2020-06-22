<template>
  <v-container fluid>
    <v-card style="height:100%" class="browser-card d-flex flex-column">
      <div class="toolbar d-flex pa-2">
        <v-btn color small icon>
          <v-icon small>mdi-home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn small width="150" text color>text</v-btn>
        <v-spacer></v-spacer>

        <v-btn color small icon>
          <v-icon small>mdi-reload</v-icon>
        </v-btn>
      </div>
      <webview src="https://www.github.com/" style="flex-grow:1"></webview>
    </v-card>
  </v-container>
</template>

<style>
.browser-card .toolbar {
}
</style>
