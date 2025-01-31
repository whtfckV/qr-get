<script setup lang="ts">
import { useOpiuStore } from "@/stores/opiu";
import { useFiltersStore } from "@/stores/reports/filters";
import { OpiuTable } from "@/components/Opiu/idnex";

const filtersStore = useFiltersStore();
const opuiStore = useOpiuStore();

const handleChangeFilter = (open: boolean) => {
  console.log(open)
  if (!open) {
    opuiStore.get();
  }
};

onMounted(() => {
  filtersStore.getFilter("customers");
  filtersStore.getFilter("partners");
  opuiStore.get();
});
</script>

<template>
  <v-app-bar title="Отчет о прибыли и убытках">
    <v-btn to="/groups" base-color="indigo-lighten-2" class="mr-4" prepend-icon="mdi-group"
      variant="tonal">
      Группы расходов
    </v-btn>
  </v-app-bar>
  <v-container fluid>
    <v-row>
      <v-col>
        <DateFilter v-model="opuiStore.dates" />
      </v-col>
      <v-col>
        <Filters v-model="opuiStore.partners" :entitys="filtersStore.filters.partners" label="Партнер"
          @change-filter="handleChangeFilter" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <SearchSelect v-model="opuiStore.customers" :entitys="filtersStore.filters.customers" label="Покупатель"
          @change-filter="handleChangeFilter" />
      </v-col>
    </v-row>
    <OpiuTable />
  </v-container>
</template>
