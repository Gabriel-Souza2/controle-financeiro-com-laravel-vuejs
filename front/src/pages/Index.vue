<template>
  <q-page padding class="bg-grey-2">
    <div class="fit">
      <money-component></money-component>
      <list-component ></list-component>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped >
</style>

<script>
import MoneyComponent from '../components/index/MoneyComponent'
import ListComponent from '../components/index/ListComponent'

export default {
  data () {
    return {
    }
  },
  components: { 
    'money-component':MoneyComponent, 
    'list-component': ListComponent 
  }

}
</script>
