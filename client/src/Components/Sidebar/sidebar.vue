<template>
  <div class="drawer">
    <div class="tabs" id="tabList">
      <v-btn color fab>
        <v-icon small>mdi-home</v-icon>
      </v-btn>
      <v-btn color fab @click="OpenNewTab">
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
    </div>

    <div class="utils">
      <v-btn color fab icon>
        <v-icon small>mdi-bell</v-icon>
      </v-btn>
      <v-btn color fab icon>
        <v-icon small>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn color fab icon @click="toggleTodoList">
        <v-icon small>mdi-playlist-check</v-icon>
      </v-btn>
      <!-- <TodoList /> -->
      <alarmMenu />
      <v-btn color fab icon>
        <v-icon small>mdi-cog</v-icon>
      </v-btn>
    </div>
    <newTab ref="newTabM" />
  </div>
</template>

<script>
import alarmMenu from "../Alarm/AlarmMenu";
import newTab from "../Browser/NewTab";
import { ipcRenderer } from "electron";
// import browserView from "../Browser/BrowerVue";

// import Vue from "vue";
// const windowTab = Vue.extend(browserView);

export default {
  components: {
    alarmMenu,
    newTab
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" }
      ]
    };
  },
  methods: {
    OpenNewTab() {
      console.log("open");
      this.$refs.newTabM.Toggle();
    },
    // newTab() {
    //   const tabInstance = new windowTab({
    //     propsData: { url: { link: "https://www.google.com/" } }
    //   });
    //   console.log(tabInstance);
    //   tabInstance.$mount(); // pass nothing
    //   document.getElementById("contentDiv").appendChild(tabInstance.$el);
    // }
    toggleTodoList() {
      ipcRenderer.send("open-todo-list");
    }
  }
};
</script>

<style >
.drawer {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 50px;
  left: 0;
  background: transparent;
}

.drawer .v-btn--fab {
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.drawer .utils {
  position: absolute;
  bottom: 0;
  left: 0;
  widows: 100%;
  padding: 10px;
}
.drawer .tabs {
  padding: 10px;
}
</style>