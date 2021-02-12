export const MeetupCover = {
  template: `<div class="meetup-cover" :style="style">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  // props
  props: {
    title: {
      type: String,
      default: 'Название митапа',
    },
    link: {
      type: String,
    },
  },

  computed: {
    style() {
      return this.link
        ? {
            '--bg-url': `url(${this.link})`,
          }
        : null;
    },
  },
};
