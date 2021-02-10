import { RangepickerEvent } from './RangepickerEvent.js';
export const RangepickerCell = {
  template: `
  <div class="rangepicker__cell"
  :class="{rangepicker__cell_inactive: !isActive}"
    >{{ day.day }}
    <template v-if="day.meetups.length !== 0">
      <template v-for="meetup in day.meetups">
        <rangepicker-event :event="meetup"/>
      </template>
    </template>
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
