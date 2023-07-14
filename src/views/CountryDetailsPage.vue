<template>
  <div class="section">
    <div class="columns">
      <div class="column is-4">
        <figure class="box image is-4by3">
          <img :src="flag" :alt="countryData.flags?.alt">
        </figure>
      </div>
      <div class="column">
        <h2 class="title">{{countryName}}</h2>
        <div class="has-text-left is-size-5-fullhd">
          <div><b>Регион:</b> {{countryData.region}}</div>
          <div><b>Столица:</b> {{capital}}</div>
          <div><b>Используемые валюты:</b> {{allCurrencies}}</div>
          <div><b>Основная валюта:</b> {{currency}}</div>
          <div><b>Численность населения:</b> {{countryData.population}} человек</div>
          <div><b>Язык:</b> {{languages}}</div>
          <div><b>Временная зона:</b> {{timezone}}</div>
          <div><b>Соседние страны:</b> {{bordersCountries}}</div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <CurrencyBlock :currencyCodeTo="currencyCodeTo"/>
      </div>
      <div class="column">
        <div class="box">
          <UniversitySection :country="country"
                             :nameOfficial="nameOfficial"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UniversitySection from "../../UniversitySection"
import CurrencyBlock from "@/components/CurrencyBlock"
import {getCountriesData} from "@/api/countries/api"
import {mapGetters} from "vuex";

export default {
  name: "CountryDetailsPage",
  components:{UniversitySection, CurrencyBlock},
  created() {
    this.country = this.$route.params.props
  },
  mounted() {
    const getCountries = async () => {
      try {
        const data = await getCountriesData(this.$route.params.props)
        this.countryData = data[0]
        // this.currencyCodeTo = this.countryData?.currencies
        // console.log(isCurrencies)
        // if(isCurrencies) this.currencyCodeTo =  Object.keys(this.countryData.currencies)[0]
        // snackbarInfo('Данные о стране загружены')
      } catch (error) {
        // snackbarError(error)
        console.log(error)
      }
    }
    getCountries()
  },
  data() {
    return {
      countryData: {},
      country: '',
      // currencyCodeTo: ''
    }
  },
  computed: {
    ...mapGetters(['getCountriesSelectName']),
    flag () {
      return this.countryData.flags?.png
    },
    countryName (){
      const isName = this.countryData.name
      if(isName) return this.countryData.name.official
        return ''
    },
    capital (){
      return this.countryData?.capital?.[0]
    },
    allCurrencies (){
      const isCurrency = this.countryData.currencies
      if(isCurrency) return Object.values(this.countryData.currencies)
            .reduce((acc, cur)=> acc + `${cur.name}, `, '')
            .slice(0, -2)
      return ''
    },
    currency() {
      const isCurrency = this.countryData.currencies
      if(isCurrency) return Object.values(this.countryData.currencies)[0].name
      return ''
    },
    timezone() {
      return this.countryData?.timezones?.join(', ')
    },
    languages() {
      const isLanguages = this.countryData.languages
      if(isLanguages) return Object.values((this.countryData.languages)).join(', ')
      return ''
    },
    bordersCountries() {
      const isBorders = this.countryData.borders
      if(isBorders) {
          return this.getCountriesSelectName.reduce((acc, item)=>{
            if(this.countryData.borders.includes(item.cca3))  acc+=`${item.name}, `
            return acc
      },'')
      }
      return 'У страны нет сухопутных границ'
    },
    nameOfficial() {
      return this.countryData?.name?.official
    },
    currencyCodeTo (){
      const isCurrencies = this.countryData.currencies
      console.log(isCurrencies)
      if(isCurrencies) return Object.keys(this.countryData.currencies)[0]
      return ''
    }
  }
}
</script>
