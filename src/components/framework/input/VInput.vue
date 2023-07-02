<template>
    <b-input :type="type"
             :icon="icon"
             :placeholder="placeholder"
             :maxlength="maxlength"
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
    icon:{
      type: String,
      default: ''
    },
    maxlength: {
      type: [Number, String],
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