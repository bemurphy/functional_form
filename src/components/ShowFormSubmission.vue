<template>
  <div class="col-md-12">
    <div id="form-submissions" class="row">
      <div class="col-md-4">
        <ul class="list-group">
          <li class="list-group-item" v-for="submission in submissions">
            <router-link :to="{ name: 'ShowFormSubmission', params: { form_id: form.id, id: submission.id }}">{{ submission.email }}</router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-7 col-md-offset-1 submission">
        <div class="actions pull-right">
          <a href="#" @click.prevent="" class="btn btn-primary btn-sm">Reply</a>
          <a href="#" @click.prevent="" class="btn btn-danger btn-sm">Delete</a>
        </div>
        <img :src="submission.avatar" width="64" class="img-circle img-avatar">
        <h4 class="submission-name">{{ submission.email }}</h4>

        <dl v-for="(value, key) in submissionAttributes">
          <dt style="text-transform: capitalize;">{{ key }}</dt>
          <dd>{{ value }}</dd>
        </dl>

      </div>
    </div>
  </div>
</template>

<script>
import FormNav from './FormNav.vue'
import getSubmissions from '../get_submissions.js'

function findSubmission(id, submissions) {
  let submission = submissions.find(function(submission){
    return submission.id === parseInt(id);
  }) || {};

  return submission;
}

function fetchSubmissions(store) {
  return store.dispatch('LOAD_SUBMISSIONS');
}

export default {
  data() {
    return {};
  },

  props: ['form'],

  components: {
    FormNav
  },

  computed: {
    submissions() {
      return this.$store.getters.submissions;
    },

    submission() {
      let submission = findSubmission(this.$route.params.id, this.$store.getters.submissions);

      if (submission) {
        return submission;
      } else {
        return {};
      }
    },

    submissionAttributes(submission) {
      let a = {};

      for(let prop in this.submission) {
        if (prop !== 'email' && prop !== 'id' && prop !== 'avatar') a[prop] = this.submission[prop];
      }

      return a;
    }
  },

  beforeMount() {
    fetchSubmissions(this.$store);
  }
}
</script>

<style>
  h4.submission-name { margin-top: 0; }

  .img-avatar {
    margin-bottom: 10px;
  }

  #form-submissions .list-group-item {
    border: none;
    padding-left: 0;
  }

  #form-submissions .list-group-item a {
    color: #666;
  }
</style>
