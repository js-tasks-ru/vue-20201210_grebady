import { RangepickerCell } from './RangepickerCell.js';

export const RangepickerDateGrid = {
  template: `
    <div class="rangepicker__date-grid">
      <template v-for="day in days">
        <rangepicker-cell :day="day" :current-month="currentMonth"></rangepicker-cell>
      </template>
    </div>
  `,
  components: {
    RangepickerCell,
  },
  props: {
    days: {
      type: Object,
      required: true,
    },
    currentMonth:{
      type: Number,
      required: true,
    },
  },
};
