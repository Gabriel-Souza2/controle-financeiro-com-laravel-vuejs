<template>
  <div>
    <EntryForm :show="form" v-on:close-dialog="form = false"></EntryForm>
    <TableComponent
      icon="credit_card"
      title="My Entries"
      :columns="columns"
      :data="entries"
      state="entries"
      @filters="applyFilters"
      @add="form = true"
    ></TableComponent>
  </div>
</template>

<script>
import EntryForm from "../../generics/forms/EntryFormComponent";
import TableComponent from "../../generics/TableComponent";
import * as moment from "moment";

export default {
  data() {
    return {
      filters: ["actives", "gains", "costs"],
      form: false,
      columns: [
        {
          name: "identify",
          label: "Identificação",
          align: "left",
          field: "identify"
        },
        {
          name: "value",
          label: "Valor",
          align: "left",
          field: "value",
          sortable: true
        },
        {
          name: "type",
          label: "Tipo",
          align: "left",
          field: "type",
          format: val => (val == "costs" ? "Gastos" : "Ganhos")
        },
        {
          name: "created",
          label: "Criado",
          align: "left",
          field: "created",
          format: val => moment(val).format("DD/MM/YYYY"),
          sortable: true
        },
        {
          name: "due_date",
          label: "Vencimento",
          align: "left",
          field: "due_date",
          format: val => moment(val).format("DD/MM/YYYY"),
          sortable: true
        },
        {
          name: "category",
          label: "Categoria",
          align: "left",
          field: "category"
        }
      ]
    };
  },
  methods: {
    applyFilters($value) {
      this.filters = $value;
    }
  },
  computed: {
    entries() {
      return this.$store.getters["entries/filtered"](this.filters);
    }
  },
  components: {
    EntryForm,
    TableComponent
  }
};
</script>

<style lang="stylus"></style>
