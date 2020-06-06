<template>
  <v-dialog v-model="dialog" max-width="400" class="pa-3" persistent no-click-animation>
    <v-card width="400">
      <v-card-text class="pa-5">
        <v-row align="center" justify="center">
          <v-col cols="2">
            <p class="text-center">
              <v-btn color text icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </p>
          </v-col>
          <v-col>
            <p class="text-center">Add alarm</p>
          </v-col>
          <v-col cols="2">
            <p class="text-center">
              <v-btn color text icon @click="Insert()">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </p>
          </v-col>
        </v-row>
        <br />
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time"
              label="Picker in menu"
              prepend-icon="mdi-clock-time-two-outline"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            required
            v-if="menu2"
            v-model="time"
            full-width
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>

        <v-row>
          <v-col align-self="center" class="pb-0">
            <v-switch class="v-input--reverse" label="Delete after goes off" inset v-model="off"></v-switch>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="2">
            <v-card class="pa-2" flat tile height="40">Label</v-card>
          </v-col>
          <v-col cols="10">
            <v-text-field name="name" dense height="38" id="id" v-model="label"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { Alarm } from "../../Functions/Alarm/main.ts";
import Store from "electron-store";
const store = new Store();

export default {
  props: ["parent"],
  data() {
    return {
      dialog: false,
      menu: false,
      time: null,
      menu2: false,
      off: false,
      label: "label"
    };
  },
  methods: {
    Toggle() {
      this.dialog = !this.dialog;
    },
    Insert() {
      if (this.time == null) return;
      const id = this.parent.Alarms.length;
      this.parent.Alarms.push(new Alarm(this.time, this.off, this.label, id));
      this.Save();
    },
    Save() {
      store.set("alarms", this.parent.Alarms);
      console.log(store.get("alarms"));
    }
  }
};
</script>

<style >
.v-input--reverse .v-input__slot {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
.v-application--is-ltr
  .v-input--reverse
  .v-input__slot
  .v-input--selection-controls__input {
  margin-right: 0;
  margin-left: 8px;
}
.v-application--is-rtl
  .v-input--reverse
  .v-input__slot
  .v-input--selection-controls__input {
  margin-left: 0;
  margin-right: 8px;
}
.v-input--expand .v-input__slot .v-label {
  display: block;
  flex: 1;
}
.container {
  max-width: 360px;
}
</style>