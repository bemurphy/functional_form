import Vue from 'vue';
import AppComponent from './App.vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';

sync(store, router);

window.store = store;

const App = Vue.extend(AppComponent);
const app = new App({ router, store }).$mount('#app');
