<script setup lang="ts">
import { useProfitsGraph } from '@/stores/graphs/profits'
import { useFiltersStore } from '@/stores/reports/filters'
import { useProfitStore } from '@/stores/reports/profit'
import type { Partner } from '@/types/reports/profit'

const headers: { title: string, key: keyof Partner }[] = [
  { title: 'Партнер', key: 'partner' },
  { title: 'Успешнные платежи', key: 'succesful_payments' },
  { title: 'Средняя Сумма услуги, руб.', key: 'averange_sum_services' },
  { title: 'Общая сумма услуги, руб.', key: 'total_sum_services' },
  { title: 'Сумма вознаграждения b2p, руб.', key: 'sum_reward_p2b' },
  { title: 'Количесво возвратов, шт.', key: 'returns_amount' },
  { title: 'Возвраты, руб.', key: 'returns_sum' },
  { title: '% возвратовб шт.', key: 'returns_percent_by_things' },
  { title: '% возвратов, руб.', key: 'returns_percent_by_money' },
  { title: 'Сумма услуги за минусом вознаграждения b2p и возвратов, руб.', key: 'total_sum_minus_b2p_returns' },
  { title: 'Сумма бонуса сервесера, руб.', key: 'service_bonus_sum' },
  { title: 'Сумма страхового бонуса, руб.', key: 'insurance_bonus_sum' },
  { title: 'Общая сумма вознаграждения партнера, руб.', key: 'total_partner_reward' },
  { title: 'Прибыль до налога КУАРГЕТ, руб.', key: 'profit_before_taxes' },
]

const profitsStore = useProfitStore()
const profitGraphStore = useProfitsGraph()
const filtersStore = useFiltersStore()

const handleChange = (open: boolean) => {
  if (!open) {
    profitsStore.getProfits()
    profitGraphStore.get()
  }
}

onMounted(async () => {
  filtersStore.getFilter('partners')
  profitsStore.getProfits()
})
</script>
<template>
  <v-app-bar title="Рентабельность" />
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" md="2" />
      <v-col cols="12" md="3">
        <DateFilter v-model="profitsStore.dates" />
      </v-col>
      <v-col cols="12" md="4">
        <Filters v-model="profitsStore.partners" :entitys="filtersStore.filters.partners" label="Партнер"
          @change-filter="handleChange" />
      </v-col>
    </v-row>
    <v-card>
      <v-data-table :headers="headers" item-value="name" :items="profitsStore.profits" :show-rows-border="true"
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
<style>
.no-wrap-table .v-table__wrapper td {
  white-space: nowrap;
}
</style>
