import Vue from 'vue';
import AppComponent from './App.vue';
import router from './router';
import store from './store';

const App = Vue.extend(AppComponent);
const app = new App({ router, store }).$mount('#app');
