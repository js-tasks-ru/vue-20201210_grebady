<template>
  <label class="checkbox">
    <input
      v-bind="$attrs"
      v-on="listenersMissInput"
      :value="value"
      :checked="isChecked"
      :ArrValue="complexValue"
      type="checkbox"
    />
    <slot />
    <span></span>
  </label>
</template>

<script>
export default {
  name: 'AppCheckbox',

  inheritAttrs: false,

  props: {
    value: {},
    ArrValue: {},
    ArrChecked: {},
  },

  computed: {
    complexValue: {
      get() {
        return this.ArrValue;
      },
      set(newValue) {
        // debugger;
        if (!Array.isArray(this.ArrValue)) this.$emit('change', newValue);
        else {
          if (!this.ArrValue.includes(this.value)) {
            this.ArrValue.push(this.value);
          } else {
            this.ArrValue.splice(this.ArrValue.indexOf(this.value), 1);
          }
          this.$emit('change', this.ArrValue);
        }
      },
    },
    listenersMissInput() {
      return {
        ...this.$listeners,
        change: ($event) => {
          console.log($event);
          this.complexValue = $event.target.checked;
        },
      };
    },
    isChecked() {
      if (this.$attrs.checked) return this.$attrs.checked;

      if (!Array.isArray(this.complexValue)) {
        return this.complexValue;
      } else {
        return this.complexValue.includes(this.value);
      }
    },
  },
  model: {
    prop: 'ArrValue',
    event: 'change',
  },
};
</script>

<style scoped>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 44px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition: all 0.3s ease;
}

.checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  padding: 0;
}

.checkbox > a {
  text-decoration: none;
}

.checkbox > span {
  border: 2px solid var(--blue-light);
}

.checkbox > span {
  border-radius: 8px;
  background: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.checkbox > input:checked ~ span:after {
  display: block;
}

.checkbox > span:after {
  content: '';
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 13px;
  background-image: url('../assets/icons/icon-check.svg');
  border: none;
  transform: translate(-50%, -50%);
}
</style>
