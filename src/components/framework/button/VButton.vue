<template>
  <b-button :type="type"
            @click="$emit('click')"
            :native-type="submit"
  >
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  name: "VButton",
  props:{
    submit:{
      type: String,
      default: null
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    type(){
      if (this.isError) {
        return 'is-danger'
      }
      return 'is-primary'
    }
  }
}
</script>
