<template>
  <div>
    <CategoryFormComponent :show="form" @close-dialog="form = false"></CategoryFormComponent>
    <TableComponent 
      icon="list" 
      title="My Categories" 
      :columns="columns" 
      :data="categories"
      state="categories"
      @filters="applyFilters"
      @add="form = true"
    >
    </TableComponent>
  </div>
</template>

<script>
import CategoryFormComponent from '../../generics/forms/CategoryFormComponent'
import TableComponent from '../../generics/TableComponent'
import * as moment from 'moment'

export default {
  data () {
    return {
      filters: ['gains', 'costs', 'actives'],
      form: false,
      columns: [
        {
          name: 'name', 
          label:'Nome', 
          align: 'left', 
          field: 'name'
        },
        {
          name: 'type', 
          label:'Tipo', 
          align: 'left', 
          field: 'type',
          format: val => val == 'costs' ? 'Gastos' : 'Ganhos',
        },
        {
          name: 'created', 
          label:'Criado', 
          align: 'left', 
          field: 'created', 
          format: val => moment(val).format('DD/MM/YYYY'),  
          sortable: true
        },
        {
          name: 'total',
          label: 'total',
          align: 'left',
          field: 'total',
          format: val => parseFloat(val).toFixed(2),
          sortable: true
        }
      ],
    }
  },
  methods:{
    applyFilters($value)
    {
      this.filters  = $value
    }
  },
  computed: {
    categories()
    {
      let entries = this.$store.getters['entries/filtered'](this.filters)
      return this.$store.getters['categories/categoriasWithfilters'](entries, this.filters)

    }
  },
  components: {
    CategoryFormComponent,
    TableComponent
  },
}

</script>

<style lang="stylus">

</style>
