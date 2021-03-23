<template>
  <div class="toasts">
    <template v-for="toast in arrToasts">
      <div
        :key="toast.id"
        class="toast"
        :class="{
          toast_error: toast.type === 'error',
          toast_success: toast.type === 'success',
        }"
      >
        <app-icon :icon="toast.icon" />
        <span> {{ toast.message }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  components: { AppIcon },

  methods: {
    error(message) {
      this.arrToasts.push({
        type: 'error',
        icon: 'alert-circle',
        message,
      });
      setTimeout(() => {
        this.arrToasts.shift();
      }, DELAY);
    },

    success(message) {
      this.arrToasts.push({
        type: 'success',
        icon: 'check-circle',
        message,
      });
      setTimeout(() => {
        this.arrToasts.shift();
      }, DELAY);
    },
  },
  data() {
    return {
      arrToasts: [],
    };
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

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
