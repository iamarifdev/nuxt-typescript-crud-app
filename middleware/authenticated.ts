import { Context } from '@nuxt/types';

const authenticated = ({ redirect, store }: Context) => {
  if (store.state.authentication) {
    const { authUserState } = store.state.authentication;
    if (!authUserState || !authUserState.token) {
      return redirect('/auth/login');
    }
  } else {
    return redirect('/auth/login');
  }
};

export default authenticated;
