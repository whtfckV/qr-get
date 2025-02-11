<script lang="ts" setup>
import { useDisputsTableStore } from '@/stores/dusputs';
import { useFiltersStore } from '@/stores/reports/filters';
import { DisputTable } from '@/types/disputs';
import moment from 'moment';

type Headers = {
  title: string;
  key: keyof DisputTable;
  width?: string | number | undefined
}

type Options = {
  itemsPerPage: number,
  page: number
}

const perPage = [
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: 500, title: '500' },
]

const headers: Headers[] = [
  { title: 'Номер п/п', key: 'row_number' },
  { title: 'Партнер', key: 'partner_name' },
  { title: 'Сертификат', key: 'cert_number' },
  { title: 'Дата и время', key: 'datetime_msk' },
  { title: 'ФИО', key: 'fio' },
  { title: 'Email', key: 'email' },
  { title: 'Телефон', key: 'phone' },
  { title: 'Сумма', key: 'sum' },
  { title: 'Статус', key: 'status', width: '300px' },
  { title: 'Описание', key: 'description' },
]

const disputsStore = useDisputsTableStore()
const filtersStore = useFiltersStore();
const selected = ref('');

const handleChangeSelect = (open: boolean) => {
  if (!open) {
    disputsStore.get();
  }
};

const handleChangeOptions = (options: Options) => {
  if (options.itemsPerPage === disputsStore.limit && options.page - 1 === disputsStore.page) return
  disputsStore.limit = options.itemsPerPage
  disputsStore.page = options.page - 1
  disputsStore.get()
}

const handleDescriptionFocusUpdate = (focus: boolean, disput: DisputTable) => {
  if (focus) {
    selected.value = disput.description
  } else {
    if (selected.value !== disput.description) {
      disputsStore.updateDisputInfo(disput.id)
    }
    selected.value = ''
  }
}

const handleUpdateStatus = (open: boolean, disput: DisputTable) => {
  if (open) {
    selected.value = disput.status
  } else {
    if (selected.value !== disput.status) {
      disputsStore.updateDisputInfo(disput.id)
    }
    selected.value = ''
  }
}

onMounted(() => {
  filtersStore.getFilter("customers");
  filtersStore.getFilter("partners");
  disputsStore.getStatuses();
})
</script>

<template>
  <v-app-bar title="Диспуты" />
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <DateFilter v-model="disputsStore.dates" />
      </v-col>
      <v-col cols="12" md="4">
        <Filters v-model="disputsStore.partners" :entitys="filtersStore.filters.partners" label="Партнер"
          @change-filter="handleChangeSelect" />
      </v-col>
      <v-col>
        <Filters v-model="disputsStore.status" :entitys="disputsStore.statuses" label="Статус"
          @change-filter="handleChangeSelect" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <SearchSelect v-model="disputsStore.customers" :entitys="filtersStore.filters.customers" label="Покупатель"
          @change-filter="handleChangeSelect" />
      </v-col>
    </v-row>
    <v-card>
      <v-data-table-server class="no-wrap-table" :disable-sort="true" :show-current-page="true" :headers="headers"
        :loading="disputsStore.isLoading" :items-per-page="disputsStore.limit" :items="disputsStore.data"
        :items-length="disputsStore.size" :items-per-page-options="perPage" @update:options="handleChangeOptions">
        <template #item.datetime_msk="{ item }">
          {{
            moment(item["datetime_msk"]).format("DD.MM.YYYY/HH:mm")
          }}
        </template>
        <template #item.status="{ item }">
          <v-select v-model="item.status" :items="disputsStore.statuses"
            @update:menu="(open: boolean) => handleUpdateStatus(open, item)" hide-details="auto" density="compact"
            class="min" label="Статус" variant="outlined" />
        </template>
        <template #item.description="{ item }">
          <v-text-field v-model="item.description"
            @update:focused="(focus: boolean) => handleDescriptionFocusUpdate(focus, item)" hide-details="auto"
            label="Описание" density="compact" class="min" variant="outlined" />
        </template>
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@7"></v-skeleton-loader>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<style lang="scss">
.min {
  min-width: 330px;
}

.no-wrap-table {
  text-wrap: nowrap;
}
</style>
