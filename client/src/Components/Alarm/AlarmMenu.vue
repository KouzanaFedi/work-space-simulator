<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
    <template v-slot:activator="{on}">
      <v-btn color fab icon v-on="on">
        <v-icon small>mdi-alarm</v-icon>
      </v-btn>
    </template>

    <v-card width="300" height="500" class="py-3 my-4 card-outer" flat :key="Alarms.length">
      <NewAlarm ref="alarmAdd" :parent="this" />
      <AlarmComponent
        v-for="(a) in Alarms"
        :key="a.id"
        :off="a.deletable"
        :on="a.on"
        :date="a.date"
        :label="a.label"
      />

      <v-card-actions class="card-actions">
        <AlarmPlus :parentRefs="$refs" />
        <v-row class="mx-4">
          <v-btn color="error" @click="DeleteAllAlarms" block>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script >
import NewAlarm from "../Alarm/NewAlarm.vue";
import AlarmComponent from "../Alarm/Alarm.vue";
import AlarmPlus from "../Alarm/AlarmAdd.vue";

import Store from "electron-store";
const store = new Store();

export default {
  name: "AlarmMenu",
  components: {
    NewAlarm,
    AlarmComponent,
    AlarmPlus
  },
  data: () => ({
    Alarms: [],
    menu: false
  }),
  created: function() {
    if (store.get("alarms") !== undefined) this.Alarms = store.get("alarms");
  },
  methods: {
    DeleteAllAlarms() {
      this.Alarms = [];
      store.set("alarms", []);
    }
  },
  mounted: function() {
    //console.log(this.Alarms);
  }
};
</script>

<style >
.card-outer {
  position: relative;
}
.card-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 8px;
}
</style>