<template>
  <section>
    <b-field grouped>
      <b-select v-model="perPage">
        <option value="10">10 на странице</option>
        <option value="30">30 на странице</option>
        <option value="100">100 на странице</option>
      </b-select>
    </b-field>
    <b-table
        :data="isEmpty ? universities : []"
        :columns="columns"
        striped
        hoverable
        focusable
        bordered
        paginated
        pagination-position="top"
        :selected.sync="selected"
        :per-page="perPage"
        @dblclick="clicked"
        class="is-clickable"
    >
    </b-table>
  </section>
</template>

<script>
export default {
  name: "UniversityTable",
  props:{
    universities: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      columns: [
        {
          field: 'country',
          label: 'Страна',
          searchable: true,
          centered: true
        },
        {
          field: 'name',
          label: 'Название',
          searchable: true,
          centered: true
        },
        {
          field: 'web_pages',
          label: 'Сайт',
          searchable: true,
          centered: true
        },
      ],
      selected: null,
      currentPage: 1,
      perPage: 30,

    }
  },
  methods:{
    clicked(event) {
      console.log(event);
      this.$router.push(`/countries/${event.country}/university/${event.name}`)
    }
  },
  computed:{
    isEmpty (){
      return !!this.universities
    }
  }
}
</script>

<style scoped>

</style>