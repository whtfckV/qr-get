<script lang="ts" setup>
import { useDDSStore } from '@/stores/dds';
import { useFiltersStore } from '@/stores/reports/filters';

const headers = [
  { title: 'Статья расходов', key: 'name' },
  { title: 'Сумма', key: 'sum' },
]

const filtersStore = useFiltersStore()
const ddsStore = useDDSStore();

const handleChangeFilter = (open: boolean) => {
  if (!open) {
    ddsStore.get()
  }
}

onMounted(() => {
  filtersStore.getFilter('customers')
  filtersStore.getFilter('partners')
  ddsStore.get()
})

</script>
<template>
  <v-app-bar title="Движение денежных средств" />
  <v-container fluid>
    <v-row>
      <v-col>
        <DateFilter v-model="ddsStore.dates" />
      </v-col>
      <v-col>
        <Filters v-model="ddsStore.partners" :entitys="filtersStore.filters.partners" label="Партнер"
          @change-filter="handleChangeFilter" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <SearchSelect v-model="ddsStore.customers" :entitys="filtersStore.filters.customers" label="Покупатель"
          @change-filter="handleChangeFilter" />
      </v-col>
    </v-row>
    <v-card>
      <v-data-table :headers items-per-page="-1" :items="ddsStore.categories" :loading="ddsStore.isLoading">
        <template v-if="!ddsStore.isLoading" #body.prepend>
          <tr class="bg-grey-lighten-2">
            <td>Начальный остаток</td>
            <td>{{ ddsStore.startBalance }}</td>
          </tr>
          <tr class="bg-grey-lighten-2">
            <td>Приход</td>
            <td>{{ ddsStore.incomingSum }}</td>
          </tr>
          <tr class="bg-grey-lighten-2">
            <td>Расход</td>
            <td>{{ ddsStore.outcomingsSum }}</td>
          </tr>
        </template>
        <template v-if="!ddsStore.isLoading" #body.append>
          <tr class="bg-grey-lighten-2">
            <td>Конечный остаток</td>
            <td>{{ ddsStore.finalBalance }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
