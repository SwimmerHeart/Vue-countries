<template>
  <section class="section">
    <div class="columns is-centered">
      <h1 class="title">{{ universityName }}</h1>
    </div>
    <div class="columns">
      <p class="column is-size-4"><strong>Страна:</strong> {{ country }}</p>
      <p class="column is-size-4"><strong>Сайт:</strong> <a
          :href="webSite">{{ webSite }}</a></p>
    </div>
  </section>
</template>

<script>
import {getUniversitiesDataAllByName, getUniversitiesDataByName} from "@/api/universities";
import {getCountriesDataAll} from "@/api/countries";

export default {
  name: "UniversityPage",
  mounted() {
    this.getUniversities()
  },
  data() {
    return {
      university: {},
      webSite: ''
    }
  },
  methods: {
    async getUniversities() {
      try {
        const data = await getCountriesDataAll()
        const countriesNames = data.map(item=>{
          return {
            shortName: item.name.common,
            fullName: item.name.official
          }
        })
        const namesCountry = countriesNames.find(item=>item.shortName === this.$route.params.codeCountry)
        const universityData = await getUniversitiesDataAllByName(namesCountry.shortName, namesCountry.fullName)
        this.university = universityData.find(item=>item.name === this.$route.params.nameUniversity)
        this.webSite = this.university.web_pages[0]
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    universityName() {
      return this.$route.params.nameUniversity
    },
    country() {
      return this.$route.params.codeCountry
    }
  }
}
</script>

<style scoped>

</style>