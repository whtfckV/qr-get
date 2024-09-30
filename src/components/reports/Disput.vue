<script setup lang="ts">
  import { useDisputsStore } from '@/stores/reports/disput'
  import { useFiltersStore } from '@/stores/reports/filters'
  import type { Disput } from '@/types/reports/disput'

  const headers: { title: string, key: keyof Disput }[] = [
    // { title: 'Период', key: 'period' },
    { title: 'Партнер', key: 'name' },
    { title: 'Успешные платежи, шт', key: 'succesful_payments' },
    { title: 'Общая сумма услуг, руб', key: 'total_sum_services' },

    { title: 'Количество диспутов', key: 'disputs' },
    { title: 'Сумма диспутов', key: 'disputs_sum' },
    { title: '% диспутов по количеству', key: 'disputs_percents_by_things' },
    { title: '% диспутов по сумме', key: 'disputs_percent_by_sum' },
  ]
  const disputsStore = useDisputsStore()
  const filtersStore = useFiltersStore()

  onMounted(async () => {
    filtersStore.getFilter('partners')
    filtersStore.getFilter('products')
    disputsStore.getDisputs()
  })

</script>

<template>
  <v-app>
    <v-main tag="section">
      <v-container :fluid="true">
        <v-app-bar title="Диспуты" />
        <v-row dense>
          <v-col cols="12" md="1" />

          <v-col cols="12" md="2">
            <DateFilter />
          </v-col>

          <v-col cols="12" md="2">
            <Filters :entitys="filtersStore.filters.products" label="Товар" />
          </v-col>
          <v-col cols="12" md="2">
            <Filters :entitys="filtersStore.filters.partners" label="Партнер" />
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          item-value="name"
          :items="disputsStore.disputs"
          :show-rows-border="true"
        >
          <template #item="{ item }">
            <tr>
              <td v-for="header in headers" :key="header.key">
                {{ item[header.key] }}
              </td>
            </tr>
          </template>

        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>
