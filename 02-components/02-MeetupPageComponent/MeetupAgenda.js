import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <template v-for="item in agenda">
        <meetup-agenda-item :agendaItem="item"/>
      </template>
    </div>`,

  // components
  components: {
    MeetupAgendaItem,
  },

  // props
  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
