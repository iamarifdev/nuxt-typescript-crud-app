import { Context } from '@nuxt/types';

const anonymous = ({ redirect, store }: Context) => {
  if (store.state.authentication) {
    const { authUserState } = store.state.authentication;
    if (authUserState && authUserState.token) {
      return redirect('/');
    }
  }
};

export default anonymous;
