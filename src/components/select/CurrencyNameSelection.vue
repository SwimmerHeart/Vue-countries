<template>
  <VSelect :options="options"
           v-model="selectedItem"
           :placeholder="placeholder"
  >
  </VSelect>
</template>

<script>
import VSelect from "@/components/framework/select/VSelect"
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
    }
  },
  methods:{
    selectOption(option){
      this.$emit('selectOption', option)
    }
  },
  computed:{
    selectedItem:{
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  },
}
</script>

<style scoped>

</style>