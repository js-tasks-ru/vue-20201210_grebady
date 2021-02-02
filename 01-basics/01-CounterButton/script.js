import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#appBtn',
  data() {
    return {
      clicker: 0,
    };
  },
  methods: {
    plusOne() {
      this.clicker++;
    },
  },
});
// Рекомендуется использовать МЕТОД в качестве обработчика события
