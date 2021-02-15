<template>
  <div class="toast toast_success">
    <app-icon icon="check-circle" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import AppIcon from "./AppIcon";

export default {
  name: 'AppToastSuccess',
  components: {AppIcon},
  props: {
    message: {
      type: String,
      default: 'Success',
    },
  },
};
</script>

<style scoped></style>
