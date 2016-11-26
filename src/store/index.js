import Vue from 'vue';
import Vuex from 'vuex';
import getForms from '../services/get_forms.js';
import getSubmissions from '../services/get_submissions.js';

Vue.use(Vuex);

function findInCollection(id, collection) {
  let item = collection.find(function(item){
    return item.id === parseInt(id);
  }) || {};

  return item;
}

let hackySubmissionsCache = {};

const store = new Vuex.Store({
  state: {
    forms: [],
    form: undefined,
    submissions: [],
    submission: undefined,
    cachedSubmissions: {}
  },

  actions: {
    SET_FORM(context, form) {
      context.commit('SET_FORM', form);
    },

    DELETE_SUBMISSION(context, submissionId) {
      context.commit('DELETE_SUBMISSION', submissionId);
    },

    LOAD_FORMS(context) {
      const { commit } = context;

      getForms(function(err, data){
        commit('SET_FORMS', data);
        return data;
      });
    },

    LOAD_SUBMISSIONS(context, formId) {
      const { commit } = context;

      // TODO get rid of the caching here, doesn't belong at this layer!
      // Hack for now to keep data from reloading all the time since
      // it's randomly generated on the dev backend
      //
      // Also because this is cached, deletes don't actually stick

      if (hackySubmissionsCache[formId]) {
        commit('SET_SUBMISSIONS', hackySubmissionsCache[formId]);
        return hackySubmissionsCache[formId];
      } else {
        getSubmissions(formId, function(err, data){
          hackySubmissionsCache[formId] = data;
          commit('SET_SUBMISSIONS', data);
          return data;
        });
      }
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
