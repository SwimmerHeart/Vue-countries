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
import {getCountriesDataAll} from "@/api/countries"
import {mapGetters} from "vuex";

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
    },
    value: {
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
      const dataCountries = await getCountriesDataAll({fields: 'name'})
      dataCountries.forEach(item => {
        this.countriesName.push(item.name.common)
      })
      this.countriesName.sort()
    }
  },
  computed: {
    ...mapGetters(['getCountryUser']),
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