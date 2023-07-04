<template>
  <ul class="columns is-centered is-multiline">
    <li class="column is-12-mobile is-6-tablet is-3-desktop is-flex is-justify-content-center"
        v-for="(country, index) in countries"
        :key="index"
    >
      <div class="card m-5 is-clickable">
        <div class="card-header card-image">
          <figure class="image is-4by3">
            <img :src="country.flags.png" :alt="country.flags.alt">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <p class="title is-4">{{ country.name.common }}</p>
            <div class="has-text-left">
              <div><b>Регион:</b> {{country.region}}</div>
              <div><b>Столица:</b> {{country.capital[0]}}</div>
              <div><b>Основная валюта:</b> {{currency(country)}}</div>
              <div><b>Численность населения:</b> {{country.population}} человек</div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CountriesList",
  components: {},
  props: {
    countries: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    currency (country){
      return Object.values(country.currencies)[0]?.name
    }
  }
}
</script>

<style scoped>

</style>