<template>
  <div class="row">
    <div class="col-md-3">
      <select class="form-control" v-model="selected">
        <option v-for="form in forms" :value="form.id">{{form.name}}</option>
      </select>
      <span v-if="false">selected {{ selected }}</span>
    </div>
  </div>
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
