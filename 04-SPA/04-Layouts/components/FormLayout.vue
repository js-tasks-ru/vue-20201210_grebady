<template>
  <div class="container">
    <h1 class="page__title text-center">{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',

  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped></style>
