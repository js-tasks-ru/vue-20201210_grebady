import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Функция, возвращая словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const getAgendaItemIcons = () => ({
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
});

/**
 * Функция, возвращающая словарь заголовков по умолчанию для всех типов пунктов программы
 */
const getAgendaItemDefaultTitles = () => ({
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
});

export const app = new Vue({
  el: '#app',

  data() {
    return {
      rawMeetup: null,
    };
  },

  async mounted() {
    this.rawMeetup = await this.getMeetup(MEETUP_ID);
  },

  computed: {
    meetup() {
      const rawMeet = this.rawMeetup;

      if (!rawMeet) return null;
      return {
        ...rawMeet,
        coverStyle: rawMeet.imageId
          ? {
              '--bg-url': `url(https://course-vue.javascript.ru/api/images/${rawMeet.imageId})`,
            }
          : undefined,
        dateOnlyString: new Date(rawMeet.date).toISOString().split('T')[0],
        localDate: new Date(rawMeet.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };
    },

    agenda() {
      const rawMeet = this.rawMeetup;

      if (!rawMeet) return null;

      return rawMeet.agenda.map((item) => {
        if (item.title === null) item.title = getAgendaItemDefaultTitles()[item.type];
        item.icon = getAgendaItemIcons()[item.type];
        return item;
      });
    },
  },

  methods: {
    async getMeetup(id) {
      const response = await fetch(`${API_URL}/meetups/${id}`);
      return await response.json();
    },
    async getMeetupImg(idImg) {
      const response = await fetch(`${API_URL}/images/${idImg}`);
      return await response.blob();
    },
  },
});
