// import { Context } from '@nuxt/types';
// import createPersistedState from 'vuex-persistedstate';

// export default ({ store, isHMR, isClient }: Context) => {
//   if (isHMR) {
//     return;
//   }
//   if (isClient) {
//     if (store) {
//       // Replace store state before calling plugins
//       const { __NUXT__ } = window as any;
//       if (__NUXT__ && __NUXT__.state) {
//         store.replaceState(__NUXT__.state);
//         delete __NUXT__.state;
//       }
//     }
//     (window as any).onNuxtReady(() => {
//       createPersistedState({
//         paths: ['authentication']
//       })(store);
//     });
//   }
// };

import { Context } from '@nuxt/types';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';
import cookie from 'cookie';

export default ({ store, req, isDev }: Context) => {
  createPersistedState({
    paths: ['authentication'],
    storage: {
      getItem: key =>  (process.client ? Cookies.get(key) : cookie.parse(req.headers.cookie || '')[key]),
      setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: !isDev }),
      removeItem: key => Cookies.remove(key)
    }
  })(store);
};
