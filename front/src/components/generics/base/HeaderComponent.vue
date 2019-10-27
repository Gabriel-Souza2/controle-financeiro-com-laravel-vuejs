<template>
  <div>
    <q-toolbar class="text-primary">
      <q-toolbar-title class="text-weight-bolder text-h5">
        <q-icon :name="icon"></q-icon>
        {{title}}
      </q-toolbar-title>
      <div v-if="buttons">
        <q-btn flat dense round icon="add" @click="add()"></q-btn>
        <q-btn flat dense round icon="remove" @click="remove"></q-btn>
      </div>
    </q-toolbar>
    <q-separator></q-separator>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String },
    title: { type: String },
    buttons: { type: Boolean, default: false }
  },
  data() {
    return {};
  },
  methods: {
    add() {
      this.$emit("add", true);
    },
    remove() {
      this.$emit("remove", true);
    }
  }
};
</script>

<style>
</style>
