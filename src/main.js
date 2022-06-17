// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/libs/flatpickr/flatpickr.min.css';
import './assets/libs/selectize/css/selectize.bootstrap3.css';
import './assets/css/bootstrap-material.min.css';
import './assets/css/app-material.min.css';
import './assets/css/bootstrap-material-dark.min.css';
import './assets/css/app-material-dark.min.css';
import './assets/css/icons.min.css';

// import './assets/js/vendor.min.js';
// import './assets/libs/flatpickr/flatpickr.min.js';
// import './assets/libs/apexcharts/apexcharts.min.js';
// // import './assets/libs/selectize/js/selectize.min.js';
// import './assets/js/pages/dashboard-1.init.js';
// import './assets/js/app.min.js';

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(Notifications)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
