<template>
  <button @click="plus">{{ tr }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  data() {
    return {
      tr: this.count,
    };
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    count() {
      this.tr = this.count;
    },
  },

  emits: ['update:count'],

  methods: {
    plus() {
      this.tr++;

      this.$emit('update:count', this.tr);
    },
  },
};
</script>
