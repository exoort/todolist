import { Plugin } from '@nuxt/types';
import { ROUTES } from '~/constants/routes';

declare module 'vue/types/vue' {
    interface Vue {
        $routes: typeof ROUTES;
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $routes: typeof ROUTES;
    }

    interface Context {
        $routes: typeof ROUTES;
    }
}

declare module 'vuex/types/index' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Store<S> {
        $routes: typeof ROUTES;
    }
}

const colorsPlugin: Plugin = (_, inject) => {
  inject('routes', ROUTES);
};

export default colorsPlugin;
