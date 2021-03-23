import { RangepickerEvent } from './RangepickerEvent.js';
export const RangepickerCell = {
  template: `
  <div class="rangepicker__cell"
  :class="{rangepicker__cell_inactive: !isActive}"
    >{{ day.day }}
        <rangepicker-event v-for="(meetup, index) in day.meetups" :key="index" :event="meetup"/>
  </div>`,

  props: {
    day: {
      required: true,
    },
    currentMonth: {
      type: Number,
      required: true,
    },
  },
  components: {
    RangepickerEvent,
  },

  computed: {
    isActive() {
      return this.day.date.getMonth() === this.currentMonth;
    },
  },
};
