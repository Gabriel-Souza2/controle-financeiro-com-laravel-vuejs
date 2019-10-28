<template>
  <q-page padding class="bg-grey-2">
    <div class="fit">
      <div class="row">
        <div class="col-12">
          <MoneyComponent/>
        </div>
      </div>
      <div class="col-12 q-mt-md">
        <EntriesTableComponent/>
      </div>
      <div class="col-12 q-mt-md">
        <CategoriesTableComponent/>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped ></style>

<script>
import MoneyComponent from "../components/index/MoneyComponent";
import EntriesTableComponent from "../components/index/EntriesTableComponent";
import CategoriesTableComponent from "../components/index/CategoriesTableComponent";

export default {
  data() {
    return {};
  },
  components: {
    MoneyComponent,
    EntriesTableComponent,
    CategoriesTableComponent
  }
};
</script>
