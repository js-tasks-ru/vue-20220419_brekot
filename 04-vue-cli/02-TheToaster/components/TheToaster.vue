<template>
  <div class="toasts">
    <ui-toast
      v-for="toast in toasts"
      :key="toast.id"
      :class="toast.class"
      :text="toast.text"
      :icon="toast.icon"
      :time="toast.time"
    />
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    success(str) {
      this.toasts.push({
        text: str,
        class: 'toast_success',
        icon: 'check-circle',
        time: 5000,
      });
    },
    error(str) {
      this.toasts.push({
        text: str,
        class: 'toast_error',
        icon: 'alert-circle',
        time: 5000,
      });
    },
    info(str) {
      this.toasts.push({
        text: str,
        class: 'toast_info',
        icon: 'check',
        time: 2000,
      });
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
