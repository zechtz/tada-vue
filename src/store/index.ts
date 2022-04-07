import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import SnackBar from "./SnackBar";

export default new Vuex.Store({
  modules: {
    SnackBar,
  },
});
