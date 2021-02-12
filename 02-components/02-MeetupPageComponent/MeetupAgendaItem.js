import { agendaItemTitles } from './data.js';
import { agendaItemIcons } from "./data.js";
export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `
    <div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="\`/assets/icons/icon-\${icon}.svg\`" />
      </div>
      <div class="meetup-agenda__item-col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ title }}</h5>
        <p>
          <span>Докладчик</span>
          <span v-if="agendaItem.type === 'talk'" class="meetup-agenda__dot"> {{ agendaItem.speaker }}</span>
          <span v-if="agendaItem.type === 'talk'" class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,

  // props
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  // Возможно, тут потребуется computed
  computed:{
    title(){
      return (this.agendaItem.title) ? this.agendaItem.title : agendaItemTitles[this.agendaItem.type];
    },
    icon(){
      return agendaItemIcons[this.agendaItem.type];
    }
  }
};
