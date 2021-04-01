<template>
  <base-button
    :block="block"
    :tag="tag"
    class="button_danger"
    v-bind="$attrs"
    v-on="$listeners"
    ><slot />
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';
export default {
  name: 'DangerButton',
  components: { BaseButton },
  props: {
    block: {
      type: Boolean,
    },
    tag: {
      type: String,
      default: 'button',
      validate: (value) => ['button', 'a', 'router-link'].includes(value),
    },
  },
};
</script>

<style scoped>
.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
