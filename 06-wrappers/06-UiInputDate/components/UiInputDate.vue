<template>
  <ui-input :type="type" v-bind="$attrs" v-model="customModel" @input="$emit('update:modelValue', $event.target.valueAsNumber)">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date'
    },
    modelValue: {
      type: Number,
      default: null
    },
  },

  emits: ['update:modelValue'],

  computed: {

    customModel() {

        if (this.modelValue)
        {
          let numDate = new Date(this.modelValue);

          if (this.type === 'date') return this.formatDate(numDate);
          else if (this.type === 'time') return this.formatTime(numDate);
          else return this.formatDate(numDate) + 'T' + this.formatTime(numDate);
        }
        else return '';
    },
  },

  methods: {
    formatDate(date) {

      var dd = date.getUTCDate();
      if (dd < 10) dd = '0' + dd;

      var mm = date.getUTCMonth() + 1;
      if (mm < 10) mm = '0' + mm;

      var yy = date.getUTCFullYear();

      return yy + '-' + mm + '-' + dd;
    },
    formatTime(date) {

      var hh = date.getUTCHours();
      if (hh < 10) hh = '0' + hh;

      var mm = date.getUTCMinutes();
      if (mm < 10) mm = '0' + mm;

      return hh + ':' + mm;
    }
  }
};
</script>
