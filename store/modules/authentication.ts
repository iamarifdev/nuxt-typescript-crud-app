import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { IAuthUser } from '../../models';

@Module({
  name: 'authentication',
  namespaced: true,
  stateFactory: true,
})
export class AuthenticationModule extends VuexModule {
  public authUserState: IAuthUser = null;

  get authUser(): IAuthUser {
    return this.authUserState;
  }

  @Mutation
  setAuthUser(auth: IAuthUser) {
    this.authUserState = auth;
  }

  @Action
  login(auth: IAuthUser) {
    this.setAuthUser(auth);
  }

  @Action
  logout() {
    this.setAuthUser(null);
  }
}

// import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';
// import { IAuthUser } from '../models';

// export const state = (): IAuthUser => ({
//   email: '',
//   token: ''
// });

// export const getters = getterTree(state, {
//   getAuthUser: stateObj => stateObj
// });

// export const mutations = mutationTree(state, {
//   setAuthUser(stateObj, auth: any) {
//     stateObj = {
//       email: auth.email,
//       token: 'user token need to be generated'
//     };
//   }
// });

// export const actions = actionTree(
//   { state, getters, mutations },
//   {
//     initialise({ commit }) {
//       commit('setAuthUser', null);
//     },
//     login({ commit }, auth: any) {
//       commit('setAuthUser', auth);
//     }
//   }
// );
