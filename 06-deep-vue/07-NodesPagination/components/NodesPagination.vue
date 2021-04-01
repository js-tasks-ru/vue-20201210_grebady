<script>
export default {
  name: 'NodesPagination',
  functional: true,
  props: {
    page: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
  },
  render(createElement, context) {
    const currentPage = context.props.page;
    const perPage = context.props.perPage;
    if (context.slots().default) {
      const visibleElements = context.slots().default.filter((item, index) => {
        return (index >= (currentPage - 1) * perPage) && (index <= (currentPage) * perPage - 1);
      });
      return createElement('div', visibleElements);
    }
    return createElement('div', '');
  },
};
</script>

<style scoped></style>
