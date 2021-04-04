<template>
  <AppInput
    ref="appInput"
    v-bind="$attrs"
    v-on="$listeners"
    :value="complexValue"
    :valueAsDate="valueAsDate"
    :valueAsNumber="valueAsNumber"
    @change="$emit('update:value-as-number', this.$refs.appInput.$refs.input.valueAsNumber)"
    :type="type"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    valueAsNumber: {
      type: Number,
    },
    valueAsDate: {
      type: Date,
    },
  },

  computed: {
    complexValue() {
      const numVal = this.valueAsNumber;
      const dateVal = this.valueAsDate;
      if (!dateVal && !numVal) return this.value;

      if ((dateVal && numVal) || numVal) return this.formatDate(numVal);
      return this.formatDate(dateVal);
    },
  },

  methods: {
    formatDate(date) {
      switch (this.type) {
        case 'date':
          return new Date(date).toISOString().split('T')[0];
        case 'time':
          return new Date(date).toISOString().split('T')[1].slice(0, 5);
        default:
          return new Date(date).toISOString().split('.')[0];
      }
    },
  },
};
</script>

<style scoped></style>
