import Vue from 'vue';
import Vuex from 'vuex';
import getSubmissions from '../get_submissions.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    submissions: [],
    forms: [],
    form: undefined
  },

  actions: {
    SET_FORM(context, form) {
      context.commit('SET_FORM', form);
    },

    LOAD_FORMS(context) {
      const { commit } = context;

      const collection = [
        { id: 1, name: "Vuex Form One" },
        { id: 2, name: "Vuex Form Two" },
        { id: 3, name: "Vuex Form Three" },
      ];

      commit('SET_FORMS', collection);
      return collection;
    },

    LOAD_SUBMISSIONS(context) {
      const { commit } = context;

      getSubmissions(1, function(err, data){
        commit('SET_SUBMISSIONS', data);
        return data;
      });
    }
  },

  getters: {
    activeForm(state) {
      return state.form || {};
    },

    forms(state) {
      if (state.forms !== null) {
        return state.forms;
      }

      return [];
    },

    submissions(state) {
      if (state.submissions !== null) {
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

    SET_SUBMISSIONS(state, collection) {
      state.submissions = collection;
    },
  },
});

export default store;
