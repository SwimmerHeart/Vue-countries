<template>
  <VField :label="label">
    <VInput :placeholder="placeholder"
            :type="type"
            :maxlength="maxlength"
            v-model="defaultValue"
    />
  </VField>
</template>

<script>
import VInput from "@/components/framework/input/VInput"
import VField from "@/components/framework/VField"
export default {
  name: "AuthInput",
  components:{
    VInput,
    VField
  },
  props:{
    value: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [Number, String],
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