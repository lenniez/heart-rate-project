import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import VueSocketio from 'vue-socket.io-extended';
import $socket from './socket-instance';


Vue.config.productionTip = false

Vue.use(VueSocketio, $socket, {store});

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
