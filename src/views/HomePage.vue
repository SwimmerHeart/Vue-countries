<template>
  <div class="section">
    <div class="columns">
      <SearchInput
          class="column is-12-mobile is-6-tablet is-3-desktop"
          placeholder="Поиск по странам..."/>
    </div>
    <CountriesList />
  </div>
</template>

<script>
import SearchInput from "@/components/input/SearchInput"
import CountriesList from "@/components/CountriesList"
import {allUrlBase, getCountriesData} from "@/api/counties/api";

export default {
  name: "HomePage",
  components: {
    SearchInput,
    CountriesList
  },
  mounted() {
    const getCountries = async () => {
      try {
        const exchangeData = await getCountriesData()
        // snackbarInfo('Данные о валютах загружены')
        console.log(exchangeData)
        this.countries = exchangeData

      } catch (error) {
        // snackbarError(error)
        console.log(error)
      }
    }
    getCountries()
  },
  data (){
    return {
      countries: []
    }
  }
}
</script>

<style scoped>

</style>