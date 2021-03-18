import { RangepickerCell } from './RangepickerCell.js';

export const RangepickerDateGrid = {
  template: `
    <div class="rangepicker__date-grid">
        <rangepicker-cell v-for="(day, index) in days" :day="day" :key="index" :current-month="currentMonth"></rangepicker-cell>
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
