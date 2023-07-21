<template>
  <SelectCountryName v-model="selectedItem"
                     placeholder="Country"
                     icon="earth"
  />
</template>

<script>
import SelectCountryName from "@/components/select/SelectCountryName"
import {mapActions, mapGetters} from "vuex";
export default {
  name: "SelectCountry",
  components: {SelectCountryName},
  methods:  mapActions(['setCountryUser']),
  computed: {
    ...mapGetters(['getCountryUser']),
    selectedItem: {
      get() {
        return this.getCountryUser
      },
      set(value) {
        this.setCountryUser(value)
      }
    },
  }
}
</script>

<style scoped>

</style>