import Vue from 'vue';
import VueMask from 'v-mask';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueMask);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
