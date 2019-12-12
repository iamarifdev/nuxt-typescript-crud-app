import Vue from 'vue';
import Vuex from 'vuex';

import { Authentication } from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authentication: Authentication
  }
});

export default store;

// export const AuthenticationModule = getModule(Authentication, store);
