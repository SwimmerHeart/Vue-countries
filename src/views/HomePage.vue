<template>
  <div class="section">
    <div class="columns">
      <div class="column is-12-mobile is-6-tablet is-3-desktop">
        <SearchInput placeholder="Поиск по странам..."
                     v-model="country"
        />
      </div>
    </div>
    <CountriesList :countries="filteredCountries"/>
  </div>
</template>

<script>
import SearchInput from "@/components/input/SearchInput"
import CountriesList from "@/components/CountriesList"
import {getCountriesData} from "@/api/counties/api";

export default {
  name: "HomePage",
  components: {
    SearchInput,
    CountriesList
  },
  mounted() {
    const getCountries = async () => {
      try {
        this.countries = await getCountriesData()
        // console.log(this.countries.filter(item=>item.name.common.toLowerCase().includes('ser')))
        // snackbarInfo('Данные о валютах загружены')
      } catch (error) {
        // snackbarError(error)
        console.log(error)
      }
    }
    getCountries()
  },
  data (){
    return {
      countries: [],
      country: ''
    }
  },
  computed:{
    filteredCountries (){
      if(this.country){
        return this.countries.filter(item=>item.name.common.toLowerCase().includes(this.country.toLowerCase()))
      }
      else {
        return this.countries
      }
    }
  }
}
</script>

<style scoped>

</style>