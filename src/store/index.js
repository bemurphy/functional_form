import Vue from 'vue';
import Vuex from 'vuex';
import getSubmissions from '../get_submissions.js';

Vue.use(Vuex);

function findInCollection(id, collection) {
  let item = collection.find(function(item){
    return item.id === parseInt(id);
  }) || {};

  return item;
}

const store = new Vuex.Store({
  state: {
    forms: [],
    form: undefined,
    submissions: [],
    submission: undefined,
  },

  actions: {
    SET_FORM(context, form) {
      context.commit('SET_FORM', form);
    },

    SET_SUBMISSION(context, submissionId) {
      context.commit('SET_SUBMISSION', submissionId);
    },

    DELETE_SUBMISSION(context, submissionId) {
      context.commit('DELETE_SUBMISSION', submissionId);
    },

    LOAD_FORMS(context) {
      const { commit } = context;

      const collection = [
        { id: 1, name: "Vuex Form One" },
        { id: 2, name: "Vuex Form Two" },
        { id: 3, name: "Vuex Form Three" },
      ];

      $.get('http://localhost:9393/forms', function(data){
        commit('SET_FORMS', data);
        return data;
      });
    },

    LOAD_SUBMISSIONS(context, formId) {
      const { commit } = context;

      getSubmissions(formId, function(err, data){
        commit('SET_SUBMISSIONS', data);
        return data;
      });
    }
  },

  getters: {
    activeForm(state) {
      let id = state.route.params.form_id;
      if (id) return findInCollection(id, state.forms) || {};
      return {};
      // return state.form || {};
    },

    forms(state) {
      if (state.forms !== null) {
        return state.forms;
      }

      return [];
    },

    submission(state) {
      let id = state.route.params.id;
      if (id) return findInCollection(id, state.submissions) || {};
      return {};
    },

    submissions(state) {
      if (state.submissions) {
        return state.submissions;
      }

      return [];
    },
  },

  mutations: {
    SET_FORM(state, form) {
      state.form = form;
    },

    SET_FORMS(state, collection) {
      state.forms = collection;
    },

    SET_SUBMISSION(state, submissionId) {
      if (state.submissions) {
        state.submission = findSubmission(submissionId, state.submissions);
      }
    },

    DELETE_SUBMISSION(state, submissionId) {
      state.submissions = state.submissions.filter(function(sub){
        return sub.id !== submissionId;
      });
    },

    SET_SUBMISSIONS(state, collection) {
      state.submissions = collection;
    },
  },
});

export default store;
