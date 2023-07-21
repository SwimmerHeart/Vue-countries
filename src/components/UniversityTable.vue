<template>
  <section>
    <b-field grouped>
      <b-select v-model="perPage" @input="changeCount">
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
        backend-pagination
        pagination-position="top"
        :loading="loading"
        :selected.sync="selected"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :total="totalCount"
        @page-change="changePage"
        @dblclick="clicked"
        @click="goToUniversityInfo"
    >
    </b-table>
  </section>
</template>

<script>
import {getUniversitiesCountByName, getUniversitiesDataAllByName, getUniversitiesDataByName} from "@/api/universities";

export default {
  name: "UniversityTable",
  props:{
    country: {
      type: String,
      default: ''
    },
    nameOfficial: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.getUniversities()
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
      universities: [],
      selected: null,
      currentPage: 1,
      perPage: 30,
      totalCount: 0,
      loading: false
    }
  },
  methods:{
    async getUniversities(){
      try {
        this.loading = true
          this.totalCount = await getUniversitiesCountByName({
            shortName: this.country,
            longName: this.nameOfficial
          })
          this.universities = await getUniversitiesDataAllByName(this.country, this.nameOfficial,
              {page: this.currentPage, count: this.perPage})
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    changePage(page) {
      this.currentPage = page
      this.getUniversities()
    },
    changeCount(count) {
      this.perPage = count
      this.currentPage = 1
      this.getUniversities()
    },
    clicked(event) {
      this.$router.push(`/countries/${event.country}/university/${event.name}`)
    },
    goToUniversityInfo(university) {
      if (university) {
        this.$router.push({ name: 'university',
          params: { nameUniversity: university.name}})
      }
    },
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