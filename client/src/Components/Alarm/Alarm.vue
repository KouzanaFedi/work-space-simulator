<template>
  <v-card width="400" class="my-0 mx-0 py-0" flat>
    <v-card-text class="d-flex flex-row-reverse py-0">
      <div class="text-right">
        <v-switch inset v-model="onSwitch"></v-switch>
      </div>
      <v-row align="center" justify="center">
        <v-col class>
          <p class="Date my-0" v-bind:class="{ 'Off': !onSwitch}">
            {{date}}
            <sub>{{label}}</sub>
          </p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["off", "date", "label", "on"],
  data: () => ({
    onSwitch: false
  }),
  mounted: function() {
    this.onSwitch = this.on;
  }
});
</script>

<style>
.Date {
  position: relative;
  font-size: 24px;
  font-weight: bold;
  color: white;
  transition: color 0.3s;
}
.Date.Off {
  color: gray;
}
.Date sub {
  position: absolute;
  bottom: 8px;
  margin-left: 4px;
  font-size: 16px;
  font-weight: normal;
  color: gray;
}
</style>
