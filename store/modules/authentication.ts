import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { IAuthUser } from '../../models';

@Module({ name: 'authentication' })
export class Authentication extends VuexModule {
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
}
