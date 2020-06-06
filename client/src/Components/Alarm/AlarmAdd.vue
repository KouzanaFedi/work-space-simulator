<template>
  <v-row class="mx-4">
    <v-btn block color="primary" @click.stop="ToggleDialog()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-row>
</template>


<script>
export default {
  props: ["parentRefs"],
  methods: {
    ToggleDialog() {
      this.parentRefs.alarmAdd.Toggle();
    }
  }
};
</script>