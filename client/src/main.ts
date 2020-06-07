import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueDraggableResizable from 'vue-draggable-resizable'


Vue.config.productionTip = false

Vue.component('vue-draggable-resizable', VueDraggableResizable)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
