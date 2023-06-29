<template>
    <VCheckbox :label="label"
               v-model="checkbox"
               true-value="FormInput"
               false-value="FormSelect"
    />
</template>

<script>
import VCheckbox from "@/components/framework/input/VCheckbox"
export default {
  name: "DisplaySelectionCheckbox",
  components:{
    VCheckbox
  },
  props:{
    value: {
      type: [String, Boolean],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
  },
  computed:{
    checkbox:{
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