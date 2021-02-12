import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div v-if="rawMeetup"><meetup-view :meetup="rawMeetup"/></div>`,

  // components
  components: {
    MeetupView,
  },

  // data
  data() {
    return {
      rawMeetup: null,
    };
  },

  // mounted
  async mounted() {
    this.rawMeetup = await fetchMeetup(MEETUP_ID);
  },

  // methods

  //computed
  computed: {

  },
};
