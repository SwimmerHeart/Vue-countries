<template>
  <VSelect :options="options"
           v-model="selectedItem"
           :placeholder="placeholder"
           :icon="icon"
  >
  </VSelect>
</template>

<script>
import VSelect from "@/components/framework/select/VSelect"
import {mapActions} from "vuex";
export default {
  name: "USelect",
  components:{
    VSelect
  },
  props: {
    value:{
      type: String
    },
    options: {
      type: Array,
      default (){
        return []
      }
    },
    placeholder:{
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods:{
    ...mapActions(['setCountryUser'])
  },
  computed:{
    selectedItem:{
      get(){
        return this.$store.getters.getCountryUser
      },
      set(value){
        this.setCountryUser(value)
      }
    }
  },
}
</script>

<style scoped>

</style>