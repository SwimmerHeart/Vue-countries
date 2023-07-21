<template>
  <div class="section">
    <div class="columns">
      <div class="column is-12-mobile is-6-tablet is-3-desktop">
        <SearchInput placeholder="Поиск по странам..."
                     v-model="country"
                     @input="onChangeFilter"
        />
      </div>
    </div>
    <CountriesList :countries="countries"/>
    <infinite-loading @infinite="loadMore"  force-use-infinite-wrapper ref="infiniteLoading" :identifier="infiniteId" spinner="bubbles"></infinite-loading>
  </div>
</template>

<script>
import SearchInput from "@/components/input/SearchInput"
import CountriesList from "@/components/CountriesList"
import {getCountriesArrayLength, getCountriesDataAll, getCountriesDataByName} from "@/api/countries"
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: "CountriesPage",
  components: {
    SearchInput,
    CountriesList,
    InfiniteLoading
  },
  data() {
    return {
      countries: [],
      country: '',
      itemsPerPage: 12,
      currentPage: 1,
      infiniteId: 0
    }
  },
  methods: {
    async getCountries(page, count, name) {
      if(name) return await getCountriesDataByName(name, {page, count})
      return await getCountriesDataAll({page, count, name})
    },
    onChangeFilter () {
      this.currentPage = 1
      this.infiniteId += 1
      this.countries = []
    },
    async loadMore($state) {
      try {
        if (this.currentPage === 1) this.totalCount = await getCountriesArrayLength()
        const countries = await this.getCountries(this.currentPage, this.itemsPerPage, this.country)
        this.countries = [...this.countries, ...countries]
        this.currentPage += 1
        if ($state) {
          $state.loaded()
          if (this.currentPage * this.itemsPerPage >= this.totalCount) {
            $state.complete()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>

<style scoped>

</style>