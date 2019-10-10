<template>
  <q-page class="bg-grey-2 flex">
    <div class="fit q-mx-md">
      <div class="q-mt-xl">
        <money-component></money-component>
      </div>
      <div class="q-mt-xl">
        <list-component ></list-component>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped >
</style>

<script>
import MoneyComponent from '../components/index/MoneyComponent'
import ChartComponent from '../components/index/ChartComponent'
import ListComponent from '../components/index/ListComponent'

export default {
  data () {
    return {
    }
  },
  components: { 
    'money-component':MoneyComponent, 
    'chart-component':ChartComponent, 
    'list-component': ListComponent 
  }

}
</script>
