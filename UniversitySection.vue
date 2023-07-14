<template>
  <div>
        <UniversityTable :universities="universities"/>
  </div>
</template>

<script>
import UniversityTable from "@/components/UniversityTable"
import {getUniversitiesData} from "@/api/universities/api"

export default {
  name: "UniversitySection",
  components:{UniversityTable},
  props:{
    country:{
      type:String,
      default: ''
    },
    nameOfficial:{
      type:String,
      default: ''
    },
  },
  mounted() {
    const getUniversities = async () => {
      try {
        // console.log('this.country', this.country)
        this.universities = await getUniversitiesData(this.country)
        if(!this.universities.length) this.universities = await getUniversitiesData(this.nameOfficial)
        // console.log('univers', this.universities)
      } catch (error) {
        console.log(error)
      }
    }
    getUniversities()
  },
  data() {
    return {
      universities: []
    }
  },
  watch: {
    country(value) {
      console.log('watch country',value);
      // this.country = value
    }
  }
}
</script>

<style scoped>

</style>