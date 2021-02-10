import { RangepickerDateGrid } from './RangepickerDateGrid.js';
/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `
    <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="showPreviousMonth()"></button>
          <div>{{ localMonthStr }}</div>
          <button class="rangepicker__selector-control-right" @click="showNextMonth()"></button>
        </div>
      </div>
      <rangepicker-date-grid :days="days" :current-month="currentMonth"/>
    </div>
    </div>`,

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц
  data() {
    return {
      date: new Date(new Date().setDate(1)), //Первый день этого месяца
    };
  },

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed: {
    localMonthStr() {
      const dateStr = this.date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
      return dateStr[0].toUpperCase() + dateStr.slice(1, -3);
    },

    currentMonth() {
      return this.date.getMonth();
    },

    days() {
      const notMutableDate = new Date(this.date);
      const weekDayOfFirstDay = notMutableDate.getDay();
      const daysInGrid = {};

      // Заполнение старых дат в календаре, если первый день недели воскресенье, то заполняем 6 дней неактивными
      if (weekDayOfFirstDay === 0) {
        let currentDateInGrid = this.getPreviousDateNthDays(notMutableDate, 6); //полная дата 6 дней назад

        for (let i = 0; i < 6; i++) {
          daysInGrid[this.getDDMMYYYYDateFormat(currentDateInGrid)] = {
            day: currentDateInGrid.getDate(),
            date: currentDateInGrid,
            meetups: [],
          };
          currentDateInGrid = this.getNextDateNthDays(currentDateInGrid, 1);
        }
      } else if (weekDayOfFirstDay !== 1) {
        const numberOfFirstOldInactiveDays = weekDayOfFirstDay - 1; //отображаемое количество дней прошлого месяца
        let currentDateInGrid = this.getPreviousDateNthDays(
          notMutableDate,
          numberOfFirstOldInactiveDays,
        ); //номер дня первого неактивного дня календаре (предыдущий месяц)

        for (let i = 0; i < weekDayOfFirstDay - 1; i++) {
          daysInGrid[this.getDDMMYYYYDateFormat(currentDateInGrid)] = {
            day: currentDateInGrid.getDate(),
            date: currentDateInGrid,
            meetups: [],
          };
          currentDateInGrid = this.getNextDateNthDays(currentDateInGrid, 1);
        }
      }

      //определяем последний день в месяце
      const nextMonth = this.getNextDateMonth(notMutableDate); //Дата первого дня в следующем месяце
      const dateOfLastDayInMonth = this.getPreviousDateNthDays(nextMonth, 1); //Дата последнего дня в этом месяце
      const lastDayInMonth = dateOfLastDayInMonth.getDate(); //Номер последнего дня в этом месяце (количество дней)

      // Заполняем календарь днями из месяца
      let currentDateInGrid = new Date(notMutableDate);
      for (let i = 1; i <= lastDayInMonth; i++) {
        daysInGrid[this.getDDMMYYYYDateFormat(currentDateInGrid)] = {
          day: currentDateInGrid.getDate(),
          date: currentDateInGrid,
          meetups: [],
        };
        currentDateInGrid = this.getNextDateNthDays(currentDateInGrid, 1);
      }

      //Заполняем часть следующего месяца
      const weekdayOfLastDay = dateOfLastDayInMonth.getDay(); // День недели (номер дня в неделе) последнего дня этого месяца
      const addDays = 7 - weekdayOfLastDay; //Добавим столько дней из следующего месяца (до конца недели)

      if (addDays !== 7) {
        let currentDateInGrid = this.getNextDateMonth(notMutableDate);
        for (let i = 1; i <= addDays; i++) {
          daysInGrid[this.getDDMMYYYYDateFormat(currentDateInGrid)] = {
            day: currentDateInGrid.getDate(),
            date: currentDateInGrid,
            meetups: [],
          };
          currentDateInGrid = this.getNextDateNthDays(currentDateInGrid, 1);
        }
      }

      //Заполнение дней ивентами
      this.meetups.forEach(meetup => {
        const DDMMYYYY = this.getDDMMYYYYDateFormat(new Date(meetup.date));
        if (DDMMYYYY in daysInGrid) {
          daysInGrid[DDMMYYYY].meetups.push(meetup);
        }
      });

      return daysInGrid;
    },
  },

  // Методы понадобятся для переключения между месяцами
  methods: {
    //Методы в шаблоне
    showNextMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
    },
    showPreviousMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    },

    //Функционал компонента
    getNextDateMonth(date) {
      const nextMonth = new Date(date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    },
    getPreviousDateMonth(date) {
      const previousMonth = new Date(date);
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      return previousMonth;
    },
    getPreviousDateNthDays(date, numOfDays) {
      const previousDate = new Date(date);
      previousDate.setDate(previousDate.getDate() - numOfDays);
      return previousDate;
    },
    getNextDateNthDays(date, numOfDays) {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + numOfDays);
      return nextDate;
    },
    getDDMMYYYYDateFormat(date) {
      return date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    },
  },

  components: {
    RangepickerDateGrid,
  },
};
