<template>
  <AppInput
    v-bind="$attrs"
    v-on="$listeners"
    :value="complexValue"
    @input="emitCorrectDate($event)"
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

function convertDateToUTC(date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ),
  );
}

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
    isStep60() {
      return +this.$attrs.step % 60 === 0;
    },
    isHH_MM() {
      return (
        (this.valueAsNumber / 1000) % 100 !== 0 &&
        this.valueAsDate &&
        this.valueAsDate.getSeconds() !== 0
      );
    },
  },

  methods: {
    formatDate(date) {
      switch (this.type) {
        case 'date':
          return new Date(date).toISOString().split('T')[0];
        case 'time':
          return new Date(date)
            .toISOString()
            .split('T')[1]
            .slice(0, !this.isStep60 && this.isHH_MM ? 8 : 5);
        default:
          return new Date(date).toISOString().split('.')[0];
      }
    },
    emitCorrectDate(event) {
      switch (this.type) {
        case 'date': {
          const date = new Date(event);
          this.$emit('update:valueAsNumber', +date);
          this.$emit('update:valueAsDate', date);
          break;
        }
        case 'time': {
          const date = new Date(this.valueAsNumber);
          const UTCDate = new Date(
            date.setHours(date.getHours() + date.getTimezoneOffset() / 60),
          );

          const [hh, mm, ss] = event.split(':');
          UTCDate.setHours(+hh, +mm, +ss);
          const valueAsNumber = +new Date(
            Date.UTC(
              UTCDate.getFullYear(),
              UTCDate.getMonth(),
              UTCDate.getDate(),
              UTCDate.getHours(),
              UTCDate.getMinutes(),
              UTCDate.getSeconds(),
            ),
          );
          this.$emit('update:value-as-number', valueAsNumber);
          break;
        }
        default: {
          const date = new Date(event);
          const valueAsDate = new Date(
            Date.UTC(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              date.getHours(),
              date.getMinutes(),
              date.getSeconds(),
            ),
          );
          this.$emit('update:valueAsNumber', +valueAsDate);
          this.$emit('update:valueAsDate', valueAsDate);
          break;
        }
      }
    },
  },
};
</script>

<style scoped></style>
