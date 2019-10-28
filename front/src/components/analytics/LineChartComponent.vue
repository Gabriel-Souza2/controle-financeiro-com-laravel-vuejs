<template>
  <q-card>
    <q-card-section>
      <HeaderComponent icon="bar_chart" title="My Analytics" />
    </q-card-section>
    <q-card-section class="row">
      <div class="col-1 self-center">
        <q-btn
          flat
          rounded
          icon="keyboard_arrow_left"
          @click="updateChart('previus')"
          color="primary"
          size="lg"
        />
      </div>
      <div class="col-10">
        <canvas id="myChart"></canvas>
      </div>
      <div class="col-1 self-center">
        <q-btn
          flat
          rounded
          icon="keyboard_arrow_right"
          @click="updateChart('next')"
          color="primary"
          size="lg"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import HeaderComponent from "../generics/base/HeaderComponent";
import MonthsManager from "../../helpers/DateHelpers";
import Chart from "chart.js";

export default {
  data() {
    return {
      chart: {},
      manager: null,
      sumByMonths: null
    };
  },

  methods: {
    updateChart(type) {
      //Atualiza o chart
      type == "next" ? this.manager.next() : this.manager.previus();
      this.chart.data.labels = this.manager.months;
      this.chart.data.datasets[0].data = this.sumByMonths(
        "costs",
        this.manager.months
      );
      this.chart.data.datasets[1].data = this.sumByMonths(
        "gains",
        this.manager.months
      );
      this.chart.update();
    },

    createChart() {
      //Cria o chart
      const ctx = document.getElementById("myChart");
      let myChart = new Chart(ctx, {
        responsive: true,
        type: "line",
        data: {
          labels: this.manager.months,
          datasets: [
            {
              label: "Gasto",
              data: this.sumByMonths("costs", this.manager.months),
              backgroundColor: "red",
              borderColor: "red",
              fill: false,
              lineTension: 0,
              pointRadius: 5
            },
            {
              label: "Ganhos",
              data: this.sumByMonths("gains", this.manager.months),
              backgroundColor: "green",
              borderColor: "green",
              fill: false,
              lineTension: 0,
              pointRadius: 5
            }
          ]
        },
        options: this.options
      });

      this.chart = myChart;
    }
  },
  mounted() {
    this.sumByMonths = this.$store.getters["entries/sumByMonths"];
    const { init, end } = this.$store.getters["entries/firstAndLastEntries"];
    this.manager = new MonthsManager(init.due_date, end.due_date);
    this.createChart();
  },

  components: {
    HeaderComponent
  }
};
</script>

<style lang="stylus"></style>
