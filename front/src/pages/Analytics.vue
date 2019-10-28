<template>
  <q-page padding class="bg-grey-2 flex">
    <div class="fit">
      <div class="row">
        <div class="col-12">
          <LineChartComponent />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import LineChartComponent from "../components/analytics/LineChartComponent";
export default {
  components: {
    LineChartComponent
  }
};
</script>

<style>
</style>
