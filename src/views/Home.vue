<template>
  <div class="container">
    <h1>Guten Tag, User</h1>
    <h2>Deine Pläne:</h2>
    <PlanTable></PlanTable>
    <Table></Table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.css";
import PlanTable from "@/components/PlanCarousel.vue";
import Table from "@/components/Table.vue";

export default defineComponent({
  components: {
    PlanTable,
    Table,
  },
  data() {
    return {};
  },
});
</script>
<style lang="scss">
ul {
  list-style: none;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 5px;
  border: 1px solid #888;
  width: 50%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.btn-dark:focus {
  box-shadow: none;
}
</style>