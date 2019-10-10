<template>
  <q-card class="chart-card">
    <q-card-section class="text-h6">
      Minhas categorias
    </q-card-section>
    <q-card-section>
      <q-radio v-model="type" val="gains" label="Ganhos" color="green" />              
      <q-radio v-model="type" val="costs" label="Gastos" color="red" />  
      <q-checkbox v-model="actives" val="actives" label="Ativos" color="blue" />
      <canvas id="chart" height="385"></canvas>           
    </q-card-section>
  </q-card>
</template>

<script>
import Chart from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {randomColors} from "../../services/random-colors"
import _ from "lodash"


export default {
  data () {
    return {
      type: 'costs',
      actives: true,
      myChart: {},
      colors: []
    }
  },

  computed:{
    categorias()
    {
      let filters = [this.type]
      this.actives ? filters.push('actives') : '' 
      let entries = this.$store.getters['entries/filtered'](filters)
      return this.$store.getters['categories/categories'](entries, this.type)
    }
  },

  methods: {
    createChart() {

      const ctx = document.getElementById('chart')
      this.myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'doughnut',
        data: {
          labels: this.categorias.labels,
          datasets: [{
              data: this.categorias.values,
              backgroundColor: this.colors[this.type],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            datalabels: {
              color: 'white',
              font: {
                size: '20',
                weight: 'bolder'
              },
              formatter: (value, context) => {
                return Math.round((value / this.categorias.values.reduce((a, b) => a + b) ) * 100) + '%'
              }
            }
          }
        }
      })
    }
  },
  mounted() {
    let length = _.size(this.$store.state.categories.categories.data)
    this.colors['costs'] = randomColors(length)
    this.colors['gains'] = randomColors(length)
    this.createChart()
  },
  updated(){
    this.myChart.destroy()
    this.createChart()
  }
}
</script>

<style lang="stylus">
  .chart-card
    width 100%
    max-width 500px
</style>
