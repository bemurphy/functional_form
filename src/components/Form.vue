<template>
  <div id="form">
    <div class="row">
      <form-nav :form="form" :forms="forms"></form-nav>
    </div>
    <div class="row">
      <router-view :form="form"></router-view>
    </div>
  </div>
</template>

<script>
import FormNav from './FormNav.vue'
import getForms from '../get_forms.js'

const forms = [
  { id: 1, name: 'Test Form' },
  { id: 2, name: 'Other Form' },
  { id: 3, name: 'Another Form' },
]

function findForm(id, forms) {
  return forms.find(function(form){
    return form.id === parseInt(id);
  });
}

export default {
  data () {
    return {
      form: {},
      forms: [],
    }
  },
  components: {
    FormNav
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      getForms(function(err, forms) {
        vm.forms = forms;
        vm.form = findForm(to.params.form_id, forms);
      });
    });
  }
}
</script>

<style>
</style>
