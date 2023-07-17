<template>
  <VSelect :options="countriesName"
           v-model="selectedItem"
           :placeholder="placeholder"
           :icon="icon"
  >
  </VSelect>
</template>

<script>
import VSelect from "@/components/framework/select/VSelect"
import {getCountriesDataAllByName} from "@/api/countries/api"

export default {
  name: "USelect",
  components: {
    VSelect
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.getCountries()
  },
  data() {
    return {
      countriesName: []
    }
  },
  methods: {
    async getCountries() {
      const dataCountries = await getCountriesDataAllByName('name')
      dataCountries.forEach(item => {
        this.countriesName.push(item.name.common)
      })
      this.countriesName.sort()
    }
  },
  computed: {
    selectedItem: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

</style>