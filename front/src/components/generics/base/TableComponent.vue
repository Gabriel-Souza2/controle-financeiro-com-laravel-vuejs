<template>
  <div>
    <q-card>
      <q-card-section>
        <HeaderComponent :buttons="true" :icon="icon" :title="title" @add="add" @remove="destroy" />
      </q-card-section>
      <q-card-section>
        <q-option-group
          v-if="checkboxes"
          v-model="filters"
          :options="checkboxes"
          type="checkbox"
          inline
        />
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
import HeaderComponent from "../base/HeaderComponent";
export default {
  props: ["icon", "title", "columns", "data", "state"],
  data() {
    return {
      pagination: {
        sortBy: "created",
        descending: true,
        rowsPerPage: 5
      },
      filters: ["gains", "costs", "actives"],
      selected: [],
      checkboxes: [
        {
          value: "gains",
          label: "Ganhos",
          color: "green"
        },
        {
          value: "costs",
          label: "Gastos",
          color: "red"
        },
        {
          value: "actives",
          label: "Ativos",
          color: "blue"
        }
      ]
    };
  },
  methods: {
    add() {
      this.$emit("add", true);
    },
    destroy() {
      if (this.selected.length > 0) {
        this.$store.dispatch(this.state + "/remove", this.selected).then(() => {
          this.selected = [];
        });
      }
    }
  },
  watch: {
    filters() {
      this.$emit("filters", this.filters);
    }
  },
  components: {
    HeaderComponent
  }
};
</script>

<style>
</style>
