<template>
  <VInput :placeholder="placeholder"
           v-model.number="defaultValue"
           type="number"

  />
</template>

<script>
import VInput from "@/components/framework/input/VInput"
export default {
  name: "DataCurrencyInput",
  components:{
    VInput
  },
  props:{
    value: {
      type: Number,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed:{
    defaultValue:{
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value ? parseFloat(value) : undefined)
      }
    }
  }
}
</script>

<style scoped>

</style>