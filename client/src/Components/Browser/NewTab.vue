<template>
  <v-dialog
    v-model="dialog"
    max-width="900"
    class="pa-3"
    no-click-animation
    style="overflow:hidden"
  >
    <v-card
      flat
      color
      outline
      width="900"
      height="900"
      class="d-flex flex-column"
      style="overflow:hidden"
    >
      <v-card-text class="pa-5">
        <p class="text-center">New Tab</p>
        <br />
        <v-text-field name="name" solo rounded light label="Adress" id="id"></v-text-field>
        <h2 class="text-center">Shortcuts</h2>
      </v-card-text>

      <v-card-actions style="flex-grow: 1; overflow-y:auto">
        <v-container fluid style="height:100% !important">
          <v-card class="pa-4" light outline flat color="#222" style="height:100% !important">
            <v-row>
              <v-col cols="6">
                <v-card dark outlined height="300" class="d-flex flex-column">
                  <v-card-text class>Google</v-card-text>
                  <v-card-actions style="flex-grow: 1; align-items:flex-start;flex-wrap:wrap">
                    <v-btn
                      v-for="(app, i) in google"
                      :key="i"
                      class="ml-0 mr-2"
                      dark
                      depressed
                      height="60"
                      color="transparent"
                    >
                      <v-img :src="app.icon"></v-img>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card dark outlined height="300" class="d-flex flex-column">
                  <v-card-text class>Design</v-card-text>
                  <v-card-actions style="flex-grow: 1; align-items:flex-start;flex-wrap:wrap">
                    <v-btn
                      v-for="(app, i) in design"
                      :key="i"
                      class="ml-0 mr-2"
                      dark
                      depressed
                      height="60"
                      color="transparent"
                    >
                      <v-img :src="app.icon"></v-img>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card dark outlined height="300" class="d-flex flex-column">
                  <v-card-text class>SOCIAL APPS</v-card-text>
                  <v-card-actions style="flex-grow: 1; align-items:flex-start;flex-wrap:wrap">
                    <v-btn
                      v-for="(app, i) in social"
                      :key="i"
                      class="ml-0 mr-2"
                      dark
                      depressed
                      height="60"
                      color="transparent"
                    >
                      <v-img :src="app.icon"></v-img>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card dark outlined height="300" class="d-flex flex-column">
                  <v-card-text class>MESSAGING</v-card-text>
                  <v-card-actions style="flex-grow: 1; align-items:flex-start;flex-wrap:wrap">
                    <v-btn
                      v-for="(app, i) in messaging"
                      :key="i"
                      class="ml-0 mr-2"
                      dark
                      depressed
                      height="60"
                      color="transparent"
                    >
                      <v-img :src="app.icon"></v-img>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-card-actions>
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
      label: "label",
      google: [
        {
          title: "Google",
          icon: "https://www.google.com/s2/favicons?domain=drive.google.com"
        },
        {
          title: "Maps",
          icon: "https://www.google.com/s2/favicons?domain=maps.google.com"
        },
        {
          title: "Youtube",
          icon: "https://www.google.com/s2/favicons?domain=www.youtube.com"
        },
        {
          title: "Gmail",
          icon: "https://www.google.com/s2/favicons?domain=mail.google.com"
        },
        {
          title: "Drive",
          icon: "https://www.google.com/s2/favicons?domain=drive.google.com"
        },
        {
          title: "Photos",
          icon: "https://www.google.com/s2/favicons?domain=photos.google.com"
        },
        {
          title: "Calendar",
          icon: "https://www.google.com/s2/favicons?domain=calendar.google.com"
        }
      ],
      design: [
        {
          title: "Figma",
          icon: "https://www.google.com/s2/favicons?domain=www.figma.com"
        },
        {
          title: "XD",
          icon: "https://www.google.com/s2/favicons?domain=www.adobe.com"
        }
      ],
      social: [
        {
          title: "Twitter",
          icon: "https://www.google.com/s2/favicons?domain=www.twitter.com"
        },
        {
          title: "Facebook",
          icon: "https://www.google.com/s2/favicons?domain=www.facebook.com"
        },
        {
          title: "Instagram",
          icon: "https://www.google.com/s2/favicons?domain=www.instagram.com"
        }
      ],
      messaging: [
        {
          title: "Messenger",
          icon: "https://www.google.com/s2/favicons?domain=www.messenger.com"
        },
        {
          title: "Whatsapp",
          icon: "https://www.google.com/s2/favicons?domain=www.whatsapp.com"
        },
        {
          title: "Slack",
          icon: "https://www.google.com/s2/favicons?domain=www.slack.com"
        },
        {
          title: "Discord",
          icon: "https://www.google.com/s2/favicons?domain=www.discord.com"
        }
      ]
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
