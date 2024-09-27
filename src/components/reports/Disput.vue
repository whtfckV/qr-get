<script setup lang="ts">
  import { useDisputsStore } from '@/stores/reports/disput'
  import { useFiltersPartnersStore } from '@/stores/reports/filters/filters_partners'
  import { useFiltersProductsStore } from '@/stores/reports/filters/filters_products'
  import type { Disputs } from '@/types/reports/disput'

  const headers: { title: string, key: keyof Disputs }[] = [
    // { title: 'Период', key: 'period' },
    // { title: 'Партнер', key: 'partner' },
    { title: 'Успешные платежи, шт', key: 'succesful_payments' },
    { title: 'Общая сумма услуг, руб', key: 'total_sum_services' },

    { title: 'Количество диспутов', key: 'disputs' },
    { title: 'Сумма диспутов', key: 'disputs_sum' },
    { title: '% диспутов по количеству', key: 'disputs_percents_by_things' },
    { title: '% диспутов по сумме', key: 'disputs_percent_by_sum' },
  ]
  const disputsStore = useDisputsStore()

  const filterPartnersStore = useFiltersPartnersStore()
  const filterProductsStore = useFiltersProductsStore()

  onMounted(async () => {
    disputsStore.getDisputs()
    filterPartnersStore.getFilter()
    filterProductsStore.getFilter()
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
            <Filters :entitys="filterProductsStore.filters" label="Товар" />
          </v-col>
          <v-col cols="12" md="2">
            <Filters :entitys="filterPartnersStore.filters" label="Партнер" />
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
