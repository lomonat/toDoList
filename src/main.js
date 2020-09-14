import Vue from 'vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import App from './App.vue';
import { store } from './store';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(Vuex);
Vue.use(store);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
