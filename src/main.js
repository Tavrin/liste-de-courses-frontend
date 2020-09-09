import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import axios from 'axios';
import VModal from 'vue-js-modal';

Vue.config.productionTip = false

Vue.use({
  install (Vue) {
  Vue.prototype.$api = axios.create({
    baseURL: 'http://192.168.43.72:8000/'
  })
}
})

Vue.use(VModal)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
