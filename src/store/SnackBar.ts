import { ActionContext } from 'vuex';

interface State {
  isOpen: boolean;
  message: string;
}

const state: State = {
  isOpen: false,
  message: "",
};

const actions = {
  OPEN({ commit }: ActionContext<State, State>, payload: string): void {
    commit("OPEN", payload);
  },

  CLOSE({ commit }: ActionContext<State, State>): void {
    commit("CLOSE");
  },
};

const mutations = {
  OPEN(state: State, payload: string): void {
    state.isOpen = true;
    state.message = payload;
  },

  CLOSE(state: State): void {
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
