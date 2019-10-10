<template>
  <div class="row">
    <div class="col-12">
      <EntriesTableComponent></EntriesTableComponent>
    </div>
    <div class="col-12 q-mt-xl">
      <CategoriesTableComponent></CategoriesTableComponent>
    </div>
  </div>
</template>

<script>
import EntriesTableComponent from './List/EntriesTableComponent'
import CategoriesTableComponent from './List/CategoriesTableComponent'

export default {
  components: {
    EntriesTableComponent,
    CategoriesTableComponent
  },
}

</script>

<style lang="stylus">

</style>
