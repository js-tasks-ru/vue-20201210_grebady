import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
        <meetup-agenda-item v-for="item in agenda" :agendaItem="item"/>
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
