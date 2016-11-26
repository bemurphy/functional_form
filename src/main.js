import Vue from 'vue';
import AppComponent from './App.vue';
import router from './router';

const App = Vue.extend(AppComponent);
const app = new App({ router }).$mount('#app');
