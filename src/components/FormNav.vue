<template>
  <div id="form-nav" class="col-md-12">
    <div class="row">
      <div class="col-md-3">
        <form-picker :form="form" :forms="forms"></form-picker>
      </div>
    </div>

    <br />

    <ul class="nav nav-tabs" v-if="form.id">

      <li role="presentation" v-bind:class="{ active: isActive('submissions') }">
        <router-link :to="{ name: 'FormSubmissions', params: { form_id: form.id } }">Submissions</router-link>
      </li>

      <li role="presentation" v-bind:class="{ active: isActive('setup') }">
        <router-link :to="{ name: 'FormSetup', params: { form_id: form.id } }">Setup</router-link>
      </li>

      <li role="presentation" v-bind:class="{ active: isActive('edit') }">
        <router-link :to="{ name: 'FormEdit', params: { form_id: form.id } }">Edit</router-link>
      </li>

      <li role="presentation" v-bind:class="{ active: isActive('emails') }">
        <router-link :to="{ name: 'FormEmails', params: { form_id: form.id } }">Emails</router-link>
      </li>

      <li role="presentation" v-bind:class="{ active: isActive('export') }">
        <router-link :to="{ name: 'FormExport', params: { form_id: form.id } }">Export</router-link>
      </li>

      <li role="presentation" v-bind:class="{ active: isActive('webhooks') }">
        <router-link :to="{ name: 'FormWebhooks', params: { form_id: form.id } }">Webhooks</router-link>
      </li>

    </ul>
    <br />
  </div>
</template>

<script>
import FormPicker from './FormPicker.vue';

export default {
  data () {
    return {};
  },

  props: ['form', 'forms'],

  methods: {
    isActive: function(v) {
      let rgx = new RegExp('/' + v + '(/|$)');
      return rgx.exec(this.$route.path);
    }
  },

  components: {
    FormPicker
  }
}
</script>

<style>
  .nav-tabs {
    border-bottom-color: #ddd;
  }
</style>
