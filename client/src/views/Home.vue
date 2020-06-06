<template>
  <v-container
    fluid
    fill-height
    class="pa-0"
  >
    <div
      class="content"
      id="contentDiv"
    >
      <!-- <browerView :url="{link: 'https://www.instagram.com/'}" /> -->
      <!-- <browerView :url="{link: 'https://www.google.com/'}" /> -->
    </div>
    <sidebar />
  </v-container>
</template>

<script >
import sidebar from "../Components/Sidebar/sidebar.vue";

// import browerView from "../Components/Browser/BrowerVue";
//import alarmMenu from "../Components/Alarm/AlarmMenu.vue";
//import { Alarm } from "../Functions/Alarm/main.ts";

// @ is an alias to /src
export default {
  name: "Home",
  data: () => ({
    shit: "dd",
    oppai: "oppai"
    //
  }),
  components: {
    sidebar,
    // browerView
  },
  created: function () {
    //
  },
  methods: {
    //
  },
  mounted: function () {
    this.shit = this.oppai;
  }
};
</script>
<style >
.content {
  display: flex;
  flex-direction: row;
  padding-left: 48px;
  padding-top: 16px;
  width: 100%;
  height: 100%;
}
</style>