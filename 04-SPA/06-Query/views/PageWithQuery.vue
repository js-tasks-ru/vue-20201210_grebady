<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

function isEmpty(obj) {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  computed: {
    view: {
      get: function () {
        const value = this.$route.query.view;
        if (['list', 'calendar'].includes(value)) return value;
        else return 'list';
      },
      set: function (newValue) {
        const query = { ...this.$route.query, view: newValue };
        if (newValue === 'list') delete query.view;
        if (query !== this.$route.query && !isEmpty(query))
          this.$router.push({ query });
      },
    },
    date: {
      get: function () {
        const value = this.$route.query.date;
        if (['all', 'future', 'past'].includes(value)) return value;
        else return 'all';
      },
      set: function (newValue) {
        const query = { ...this.$route.query, date: newValue };
        if (newValue === 'all') delete query.date;
        if (query !== this.$route.query && !isEmpty(query))
          this.$router.push({ query });
      },
    },
    participation: {
      get: function () {
        const value = this.$route.query.participation;
        if (['all', 'attending', 'organizing'].includes(value)) return value;
        else return 'all';
      },
      set: function (newValue) {
        const query = { ...this.$route.query, participation: newValue };
        if (newValue === 'all') delete query.participation;
        if (query !== this.$route.query && !isEmpty(query))
          this.$router.push({ query });
      },
    },
    search: {
      get: function () {
        const value = this.$route.query.search;
        return value;
      },
      set: function (newValue) {
        const query = { ...this.$route.query, search: newValue };
        if (newValue === '') delete query.search;
        if (query !== this.$route.query)
          this.$router.push({ query });
      },
    },
  },
};
</script>

<style scoped></style>
