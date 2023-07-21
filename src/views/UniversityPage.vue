<template>
  <section class="section">
    <div class="columns is-centered">
      <h1 class="title">{{ universityName }}</h1>
    </div>
    <div class="columns">
      <p class="column is-size-4"><strong>Страна:</strong> {{ country }}</p>
      <p class="column is-size-4"><strong>Сайт:</strong> <a
          :href="universityWebPage">{{ universityWebPage }}</a></p>
    </div>
  </section>
</template>

<script>
import {getUniversitiesDataByName} from "@/api/universities";

export default {
  name: "UniversityPage",
  mounted() {
    this.getUniversities()
  },
  data() {
    return {
      university: {}
    }
  },
  methods: {
    async getUniversities() {
      try {
        const universityData = await getUniversitiesDataByName(this.$route.params.codeCountry)
        this.university = universityData.find(item=>item.name === this.$route.params.nameUniversity)
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    universityName() {
      return this.university.name
    },
    country() {
      return this.$route.params.codeCountry
    },
    universityWebPage() {
      return this.university.web_pages ? this.university.web_pages[0] : ''
    },
  }
}
</script>

<style scoped>

</style>