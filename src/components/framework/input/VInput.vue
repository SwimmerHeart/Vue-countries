<template>
    <b-input :type="type"
             :placeholder="placeholder"
             v-model="defaultValue"
    />
</template>
<script>
export default {
  name: "VInput",
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    placeholder:{
      type: String,
      default: ''
    },
    type:{
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
        this.$emit('input', value)
      }
    }
  },
}
</script>

<style scoped>

</style>