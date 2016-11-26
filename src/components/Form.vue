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

function findForm(id, forms) {
  return forms.find(function(form){
    return form.id === parseInt(id);
  });
}

function fetchForms(store) {
  return store.dispatch('LOAD_FORMS');
}

export default {
  data () {
    return {
      form: {},
    }
  },
  computed: {
    form() {
      return this.$store.getters.activeForm;
    },

    forms() {
      return this.$store.getters.forms;
    }
  },
  components: {
    FormNav
  },
  beforeMount() {
    this.$store.dispatch('SET_FORM', { id: 1, name: "testing" });
    fetchForms(this.$store);
  },
  nobeforeRouteEnter (to, from, next) {
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
