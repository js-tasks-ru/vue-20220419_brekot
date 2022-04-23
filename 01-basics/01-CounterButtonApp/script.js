import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const Root = defineComponent({
    name: 'Root',

    data() {
      return {
        num: 0,
      };
    },
});

const app = createApp(Root);

const vm = app.mount('#app');