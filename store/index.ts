// import { getStoreType, getAccessorType, mutationTree, actionTree } from 'nuxt-typed-vuex';

// import * as authentication from './authentication';

// export const state = () => ({
//   email: ''
// });

// type RootState = ReturnType<typeof state>;

// export const getters = {};

// export const mutations = mutationTree(state, {
//   initialiseStore() {
//     console.log('initialised');
//   }
// });

// export const actions = actionTree({ state, getters, mutations }, {});

// export const accessorType = getAccessorType({
//   actions,
//   getters,
//   mutations,
//   state,
//   modules: {
//     authentication
//   }
// });

import Vuex from 'vuex';
import { AuthenticationModule } from '~/store/modules';
// import createPersistedState from 'vuex-persistedstate';
// import Cookies from 'js-cookie';

export default function createStore() {
  return new Vuex.Store({
    modules: {
      authentication: AuthenticationModule
    },
    // plugins: [
    //   createPersistedState({
    //     paths: ['auth'],
    //     storage: {
    //       getItem: key => Cookies.get(key),
    //       setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: true }),
    //       removeItem: key => Cookies.remove(key)
    //     }
    //   })
    // ]
  });
}
