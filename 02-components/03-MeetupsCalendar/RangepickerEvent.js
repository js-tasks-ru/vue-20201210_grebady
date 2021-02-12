export const RangepickerEvent = {
  template: `
  <a :href="\`/meetups/\${event.id}\`" class="rangepicker__event">{{ event.title }}</a>
  `,

  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
