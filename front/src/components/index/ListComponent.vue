<template>
  <div class="row">
    <div class="col-12 q-my-lg">
      <EntriesTableComponent></EntriesTableComponent>
    </div>
    <div class="col-12">
      <CategoriesTableComponent></CategoriesTableComponent>
    </div>
  </div>
</template>

<script>
import EntriesTableComponent from "./List/EntriesTableComponent";
import CategoriesTableComponent from "./List/CategoriesTableComponent";

export default {
  components: {
    EntriesTableComponent,
    CategoriesTableComponent
  }
};
</script>

<style lang="stylus"></style>
