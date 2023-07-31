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
        @click="goToUniversityInfo"
    >
      <b-table-column field="country"
                      label="Страна"
                      searchable
                      centered
                      v-slot="props">
        {{ props.row.country }}
      </b-table-column>
      <b-table-column field="name"
                      label="Название"
                      searchable
                      centered
                      v-slot="props">
<!--        <a :href=`/country/${props.row.country}/university/${props.row.name}`-->
<!--           target="_blank">{{ props.row.name }}</a>-->
        <a>{{ props.row.name }}</a>
      </b-table-column>
      <b-table-column field="web_pages"
                      label="Сайт"
                      searchable
                      centered
                      v-slot="props"
                      class="has-text-left"
      >
        <span class="is-flex">
            <svg-icon type="mdi" :path="path" class="mr-2"></svg-icon>
          <a :href="addUrl(props.row.web_pages[0])" target="_blank">{{ props.row.web_pages[0] }}</a>
        </span>
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
import {getUniversitiesCountByName, getUniversitiesDataAllByName} from "@/api/universities"
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiWeb } from '@mdi/js'

export default {
  name: "UniversityTable",
  components:{
    SvgIcon
  },
  props: {
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
  data() {
    return {
      universities: [],
      selected: null,
      currentPage: 1,
      perPage: 30,
      totalCount: 0,
      loading: false,
      path: mdiWeb
    }
  },
  methods: {
    async getUniversities() {
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
    goToUniversityInfo(university) {
      if (university) {
        this.$router.push({
          name: 'university',
          params: {nameUniversity: university.name}
        })
      }
    },
    addUrl(url) {
      return url.startsWith('http') ? url : `http://${url}`
    }
  },
  computed: {
    isEmpty() {
      return !!this.universities
    }
  }
}
</script>
