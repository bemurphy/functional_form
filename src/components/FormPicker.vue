<template>
  <select class="form-control" v-model="selected">
    <option v-for="form in forms" :value="form.id">{{form.name}}</option>
  </select>
</template>

<script>
export default {
  data () {
    return {};
  },

  computed: {
    selected: {
      get() {
        return this.$store.getters.activeForm.id;
      },

      set(formId) {
        this.$store.dispatch('LOAD_SUBMISSIONS', formId);
        this.$router.push({name: 'FormSubmissions', params: { form_id: formId }});
      }
    }
  },

  props: ['form', 'forms']
}
</script>
