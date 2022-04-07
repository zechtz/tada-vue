const state = {
  isOpen: false,
  message: "",
};

const actions = {
  OPEN({ commit }, payload) {
    commit("OPEN", payload);
  },

  CLOSE({ commit }) {
    commit("CLOSE");
  },
};

const mutations = {
  OPEN(state, payload) {
    state.isOpen = true;
    state.message = payload
  },

  CLOSE(state) {
    state.isOpen = false;
    state.message = "";
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
