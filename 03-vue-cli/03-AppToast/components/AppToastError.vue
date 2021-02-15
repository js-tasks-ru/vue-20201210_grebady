<template>
  <div class="toast toast_error">
    <app-icon icon="alert-circle" />
    <span> {{ message }}</span>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'AppToastError',
  components: {
    AppIcon,
  },
  props: {
    message: {
      type: String,
      default: 'Error',
    },
  },
};
</script>

<style scoped></style>
