<script setup lang="ts">
import { useDisputsGraph } from '@/stores/graphs/disputs'
import { useDisputsStore } from '@/stores/reports/disput'
import { useFiltersStore } from '@/stores/reports/filters'
import type { Disput } from '@/types/reports/disput'

const headers: { title: string, key: keyof Disput }[] = [
  // { title: 'Период', key: 'period' },
  { title: 'Партнер', key: 'partner' },
  { title: 'Успешные платежи, шт', key: 'succesful_payments' },
  { title: 'Общая сумма услуг, руб', key: 'total_sum_services' },

  { title: 'Количество диспутов', key: 'disputs' },
  { title: 'Сумма диспутов', key: 'disputs_sum' },
  { title: '% диспутов по количеству', key: 'disputs_percents_by_things' },
  { title: '% диспутов по сумме', key: 'disputs_percent_by_sum' },
]
const disputsStore = useDisputsStore()
const disputsGraph = useDisputsGraph()
const filtersStore = useFiltersStore()

const handleChange = (open: boolean) => {
  if (!open) {
    disputsStore.getDisputs()
    disputsGraph.get()
  }
}

onMounted(async () => {
  filtersStore.getFilter('partners')
  filtersStore.getFilter('products')
  disputsStore.getDisputs()
})

</script>

<template>
  <v-app-bar title="Диспуты" />
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" md="1" />

      <v-col cols="12" md="3">
        <DateFilter v-model="disputsStore.dates" />
      </v-col>

      <v-col cols="12" md="3">
        <Filters
          v-model="disputsStore.products"
          :entitys="filtersStore.filters.products"
          label="Товар"
          @change-filter="handleChange"
        />
      </v-col>
      <v-col cols="12" md="4">
        <Filters v-model="disputsStore.partners" :entitys="filtersStore.filters.partners" label="Партнер"
          @change-filter="handleChange" />
      </v-col>
    </v-row>
    <v-card>
      <v-data-table :headers="headers" item-value="name" :items="disputsStore.disputs" :show-rows-border="true"
        :disable-sort="true" class="no-wrap-table">
        <template #item="{ item }">
          <tr>
            <td v-for="header in headers" :key="header.key">
              {{ item[header.key] }}
            </td>
          </tr>
        </template>
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
