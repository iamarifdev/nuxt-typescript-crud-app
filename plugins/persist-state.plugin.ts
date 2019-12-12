import { Context } from '@nuxt/types';
import VuexPersistence from 'vuex-persist';

export default ({ store, isHMR }: Context) => {
  if (isHMR) {
    return;
  }
  (window as any).onNuxtReady(() => {
    new VuexPersistence({
      storage: window.localStorage
    }).plugin(store);
  });
};
