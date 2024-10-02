<script setup lang="ts">
  import { useFiltersStore } from '@/stores/reports/filters'
  import { useProfitStore } from '@/stores/reports/profit'
  import type { Profits } from '@/types/reports/profit'

  const headers: { title: string, key: keyof Profits }[] = [
    // { title: 'Партнер', key: 'name' },
    { title: 'Успешнные платежи', key: 'succesful_payments' },
    { title: 'Средняя Сумма услуги, руб.', key: 'averange_sum_services' },
    { title: 'Общая сумма услуги, руб.', key: 'total_sum_services' },
    { title: 'Сумма вознаграждения b2p, руб.', key: 'sum_reward_p2b' },
    { title: 'Количесво возвратов, шт.', key: 'returns_amount' },
    { title: 'Возвраты, руб.', key: 'returns_sum' },
    { title: '% возвратовб шт.', key: 'returns_percent_by_things' },
    { title: '% возвратов, руб.', key: 'returns_percent_by_money' },
    { title: 'Сумма услуги за минусом вознаграждения b2p и возвратов, руб.', key: 'service_sum_minus_rewarnds' },
    { title: 'Общая сумма вознаграждения партнера, руб.', key: 'total_partner_reward' },
    { title: 'Общая сумма вознаграждения D2 + ВСК, руб.', key: 'total_sum_rewards_d2' },
    { title: 'Общая сумма вознаграждения ДЗ, руб.', key: 'total_sum_reward_d3' },
    { title: 'Прибыль до налога КУАРГЕТ, руб.', key: 'profit_before_taxes' },
  ]
  const profitsStore = useProfitStore()
  const filtersStore = useFiltersStore()

  onMounted(async () => {
    profitsStore.getProfits()
    filtersStore.getFilter('partners')
  })
</script>
<template>
  <v-container :fluid="true">
    <v-app-bar title="Рентабельность" />
    <v-row dense>
      <v-col cols="12" md="1" />

      <v-col cols="12" md="2">
        <DateFilter />
      </v-col>
      <v-col cols="12" md="2">
        <Filters :entitys="filtersStore.filters.partners" label="Партнер" />
      </v-col>
    </v-row>
    <v-card>
      <v-data-table
        :headers="headers"
        item-value="name"
        :items="profitsStore.profits"
        :show-rows-border="true"
      >
        <template #item="{ item }">
          <tr>
            <td v-for="header in headers" :key="header.key">
              {{ item[header.key] }}
            </td>
          </tr>
        </template>
        <!-- <template #item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.partner }}</td>

            </tr>
          </template> -->

      </v-data-table>
    </v-card>
  </v-container>
</template>
