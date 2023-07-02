<template>
  <VInput :placeholder="placeholder"
          type="search"
          icon="magnify"
          v-model="defaultValue"
  />
</template>

<script>
import VInput from "@/components/framework/input/VInput"
export default {
  name: "SearchInput",
  components:{
    VInput
  },
  props:{
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed:{
    defaultValue:{
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

</style>