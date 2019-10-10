<template>
  <div>
    <q-card>
      <q-card-section class="text-h5 text-primary">
        <q-toolbar>
          <q-toolbar-title class="text-weight-bolder">
            <q-icon :name="icon"></q-icon>  {{title}}
          </q-toolbar-title>
          <q-btn flat dense round icon="add" @click="addButton()"></q-btn>
          <q-btn flat dense round icon="remove" @click="remove()"></q-btn>
        </q-toolbar>
        <q-separator></q-separator>
      </q-card-section>
      <q-card-section>
        <q-option-group v-if="checkboxes" v-model="filters"  :options="checkboxes" type="checkbox" inline/>        
        <q-table
          :rows-per-page-options="[0]"
          :pagination.sync="pagination" 
          :columns="columns" 
          :data="data"
          :selected.sync="selected"
          selection="multiple"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props:['icon', 'title', 'columns', 'data', 'state'], 
  data () {
    return {
      pagination: {
        sortBy: 'created',
        descending: true,
        rowsPerPage: 5, 
      },
      filters: ['gains', 'costs', 'actives'],
      selected: [],
      checkboxes: [
        {
          value: 'gains',
          label: 'Ganhos',
          color: 'green'
        },
        {
          value: 'costs',
          label: 'Gastos',
          color: 'red'
        },
        {
          value: 'actives',
          label: 'Ativos',
          color: 'blue'
        }
      ],
    }
  },
  methods: {
    addButton()
    {
      this.$emit('add', true)
    },
    remove(){
      if(this.selected.length > 0){
        this.$store.dispatch(this.state + '/remove', this.selected).then(() => {
          this.selected = []
        })
      }
    },
  },
  watch: {
    filters(){
      this.$emit('filters', this.filters)
    }
  }
}
</script>

<style>
</style>
