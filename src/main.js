import Vue from 'vue'
import AppComponent from './App.vue'
import VueRouter from 'vue-router'
import Form from './components/Form.vue'
import ShowFormSubmission from './components/ShowFormSubmission.vue'
import FormSetup from './components/FormSetup.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/forms/:form_id', component: Form,
    children: [
      { path: 'submissions/:id', component: ShowFormSubmission, name: 'ShowFormSubmission' },
      { path: 'submissions', redirect: to => {
        return 'submissions/1';
      }, name: 'FormSubmissions' },
      { path: 'setup', component: FormSetup, name: 'FormSetup' },
      { path: 'edit', component: StubComponent('FormEdit'), name: 'FormEdit' },
      { path: 'emails', component: StubComponent('FormEmails'), name: 'FormEmails' },
      { path: 'export', component: StubComponent('FormExport'), name: 'FormExport' },
      { path: 'webhooks', component: StubComponent('FormWebhooks'), name: 'FormWebhooks' },
    ]
  },
]

function StubComponent(name) {
  return { template: '<div class="container"><div class="row"><div class="col-md-12">' + name + '#todo</div></div></div>' };
}

const App = Vue.extend(AppComponent)
const router = new VueRouter({
  routes
})

const app = new App({ router }).$mount('#app');
