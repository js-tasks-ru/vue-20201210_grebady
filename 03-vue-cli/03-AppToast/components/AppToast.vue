<template>
  <div class="toasts">
    <template v-for="toast in arrToasts">
      <app-toast-error
        v-if="toast.type === 'error'"
        :message="toast.message"
        :key="toast.id"
      />
      <app-toast-success
        v-if="toast.type === 'success'"
        :message="toast.message"
        :key="toast.id"
      />
    </template>
  </div>
</template>

<script>
import AppToastError from './AppToastError';
import AppToastSuccess from './AppToastSuccess';

const DELAY = 5000;

export default {
  name: 'AppToast',

  components: { AppToastError, AppToastSuccess },

  methods: {
    error(message) {
      this.arrToasts.push({
        type: 'error',
        message,
      });
      setTimeout(() => {
        this.arrToasts.shift();
      }, DELAY);
    },

    success(message) {
      this.arrToasts.push({
        type: 'success',
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
