import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isTemplateVisible: false,
  },
  mutations: {
    toggleTemplate(state, isTemplateVisible) {
      if (!state.user) {
        state.isTemplateVisible = false;
        return;
      }

      if (isTemplateVisible === undefined) {
        state.isTemplateVisible = !isTemplateVisible;
      } else {
        state.isTemplateVisible = isTemplateVisible;
      }
    },

    setUser(state, user) {
      state.user = user;
      if (user) {
        state.isTemplateVisible = true;
      } else {
        state.isTemplateVisible = false;
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
