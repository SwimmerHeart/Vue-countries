<template>
  <div>
        <UniversityTable :country="country"
                         :nameOfficial="nameOfficial"
        />
  </div>
</template>

<script>
import UniversityTable from "@/components/UniversityTable"

export default {
  name: "UniversitySection",
  components: {UniversityTable},
  props: {
    country: {
      type: String,
      default: ''
    },
    nameOfficial: {
      type: String,
      default: ''
    },
  }
}
</script>

<style scoped>

</style>