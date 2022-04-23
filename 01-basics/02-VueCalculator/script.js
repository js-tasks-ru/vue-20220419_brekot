import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const Root = defineComponent({
  name: 'Root',

  data() {
    return {
      numOne: 0,
      numTwo: 0,
      operator: 'sum',
    };
  },

  computed: {
    sum() {
      let sum = 0;

      switch (this.operator) {
        case 'sum':
          sum = this.numOne + this.numTwo;

          break;

        case 'subtract':
          sum = this.numOne - this.numTwo;

          break;

        case 'multiply':
          sum = this.numOne * this.numTwo;

          break;

        case 'divide':
          sum = this.numOne / this.numTwo;

          break;
      }

      return sum;
    },
  },
});

const app = createApp(Root);

const vm = app.mount('#app');
