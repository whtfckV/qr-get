<script setup lang="ts">
import { useOpiuStore } from "@/stores/opiu";

interface TableItem {
  name: string;
  sum: string | null;
  level: number;
}

const headers = [
  { title: "Название", key: "name", sortable: false },
  { title: "Сумма", key: "sum", sortable: false },
];


const opuiStore = useOpiuStore();
const createItem = (name: string, sum: string | null, level = 0): TableItem => ({
  name,
  sum,
  level,
});

const processCostPrice = () => {
  if (!opuiStore.data?.cost_price_sum) return [];
  const cost = opuiStore.data.cost_price_sum;
  return [
    createItem(cost.name, cost.sum, 0),
    ...cost.categories.map((cat) => createItem(cat.name, cat.sum, 1)),
  ];
};

const processOperatingExpenses = () => {
  if (!opuiStore.data?.operating_expenses) return [];
  const expenses = opuiStore.data.operating_expenses;
  return [
    createItem("Операционные расходы", expenses.sum, 0),
    ...expenses.groups.flatMap((group) => [
      createItem(group.name, group.sum, 1),
      ...group.categories.map((cat) => createItem(cat.name, cat.sum, 2)),
    ]),
  ];
};

const processedData = computed(() => {
  if (!opuiStore.data) return [];

  return [
    createItem("Выручка", opuiStore.data.revenue_sum, 0),
    ...processCostPrice(),
    createItem("Валовая прибыль", opuiStore.data.gross_profit_sum, 0),
    ...processOperatingExpenses(),
    createItem("Чистая прибыль", opuiStore.data.net_profit, 0),
  ];
});
</script>
<template>
  <v-card>
    <v-data-table :headers :items="processedData" class="opiu-table" :loading="opuiStore.isLoading" items-per-page="-1"
      :hide-default-footer="true">
      <template #item.name="{ item }">
        <span :style="{ paddingLeft: `${item.level * 24}px` }">
          {{ item.name }}
        </span>
      </template>
      <template #loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
    </v-data-table>
  </v-card>
</template>

<style>
.opiu-table:not(.v-data-table--loading) tbody tr:hover {
  background-color: #E0E0E0 !important;
}
</style>
