<template>
  <ul class="columns is-centered is-multiline">
    <li class="column is-12-mobile is-6-tablet is-3-desktop"
        v-for="country in countries"
        :key="country.id"
    >
      <div class="box m-5">
        {{country.name}}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CountriesList",
  components: {},
  data() {
    return {
      countries: [
          {id: 1, name: 'name country1'},
          {id: 2, name: 'name country2'},
          {id: 3, name: 'name country3'},
          {id: 4, name: 'name country4'},
          {id: 5, name: 'name country5'},
          {id: 6, name: 'name country6'},
          {id: 7, name: 'name country7'},
          {id: 8, name: 'name country8'},
      ]
    }
  }
}
</script>

<style scoped>

</style>