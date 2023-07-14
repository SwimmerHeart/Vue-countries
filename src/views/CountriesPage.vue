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
    <infinite-loading @infinite="loadMore" ref="infiniteLoading" spinner="bubbles"></infinite-loading>
  </div>
</template>

<script>
import SearchInput from "@/components/input/SearchInput"
import CountriesList from "@/components/CountriesList"
import {getCountriesData} from "@/api/countries/api"
import {mapActions} from "vuex"
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
      currentIndex: 0,
      visibleCountries: []
    }
  },
  methods: {
    ...mapActions(['setCountriesName']),
    async getCountries() {
      this.countries = await getCountriesData()
      const NameDisplay = this.countries.map(item=>{
                    return {
                      name: item.name.common,
                      cca3: item.cca3,
                      currencies: item.currencies
                    }
                  })
                  this.setCountriesName(NameDisplay)
      return this.countries
    },
    // РАБОЧИЙ ВАРИАНТ 1
    // async loadMore($state) {
    //     try {
    //       const data = await getCountriesData()
    //       const NameDisplay = data.map(item=>{
    //         return {
    //           name: item.name.common
    //         }
    //       })
    //       this.setCountriesName(NameDisplay)
    //       //получаем порцию стран и добавляем в массив стран
    //       const remainingCountries = data.slice(this.currentIndex, this.currentIndex + this.itemsPerPage)
    //       this.countries.push(...remainingCountries)
    //       console.log(this.countries)
    //       //переходим на следующую страницу
    //       this.currentIndex += this.itemsPerPage
    //       $state.loaded()
    //       //если текущий индекс элемента больше длины массива стран => выходим
    //       if (this.currentIndex >= data.length) $state.complete()
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   },
    async loadMore($state) {
      try {
        await this.getCountries()
        const remainingCountries = this.countries.slice(this.currentIndex, this.currentIndex + this.itemsPerPage)
        this.visibleCountries.push(...remainingCountries)
        this.currentIndex += this.itemsPerPage
        if ($state) {
          $state.loaded()
          if (this.currentIndex >= this.countries.length) {
            $state.complete()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    filteredCountries() {
      if (this.country) {
        return this.countries.filter(item => item.name.common.toLowerCase().includes(this.country.toLowerCase()))
      } else {
        return this.visibleCountries
      }
    }
  }
}
</script>

<style scoped>

</style>