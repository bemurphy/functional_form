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
    return {}
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
    fetchForms(this.$store);
  },
}
</script>

<style>
</style>
