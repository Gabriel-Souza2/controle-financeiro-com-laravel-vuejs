<template>
  <q-dialog v-model="open" persistent>
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6 text-primary">Adicionar Category</div>
      </q-card-section>

      <q-card-section>
        <q-input
          class="q-mb-md"
          :rules="[
            val => !!val || 'O nome é obrigatoria!'
          ]"
          ref="name"
          v-model="data.name"
          label="Nome"
        />
        <q-select emit-value map-options v-model="data.type" :options="options" label="Tipo" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="closeDialog()" v-close-popup />
        <q-btn flat label="Add" @click="add()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import formMixins from "../../../mixins/form";

export default {
  mixins: [formMixins],
  data() {
    return {
      state: "categories",
      options: [
        {
          label: "Ganhos",
          value: "gains"
        },
        {
          label: "Gastos",
          value: "costs"
        }
      ]
    };
  }
};
</script>

<style>
</style>
