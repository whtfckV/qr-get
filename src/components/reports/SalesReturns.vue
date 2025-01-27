<script setup lang="ts">
import { useSalesGraph } from "@/stores/graphs/sales";
import { useFiltersStore } from "@/stores/reports/filters";
import { useSalesReturnsStore } from "@/stores/reports/sales_return";
import { SellersReturn } from "@/types/reports/sales_return";
import { VDataTableServer } from "vuetify/components";

type Headers = {
  title: string;
  key: keyof SellersReturn;
};

const headers: Headers[] = [
  { title: "Номер п/п", key: "id" },
  // { title: 'ИД сектора', key: 'sector_id' },
  { title: "Название сектора", key: "sector_name" },
  { title: "Номер сертификата", key: "cert_number" },
  // { title: 'ИД заказа', key: 'order_id' },
  // { title: 'ИД заказа партнера', key: 'order_partner_id' },
  { title: "Дата/время (МСК)", key: "datetime_msk" },
  { title: "ФИО", key: "fio" },
  { title: "Паспортные данные", key: "passport_info" },
  { title: "Дата рождения", key: "birthday" },
  { title: "Email клиента", key: "email" },
  { title: "Номер телефона клиента", key: "phone" },
  { title: "Пакет ДЗ", key: "packet_dz" },
  { title: "Стоимость услуги", key: "price" },
  { title: "PAN Застрахованной карты", key: "card" },
  { title: "Дата подписания Держателем карты Заявления о включении", key: "date_contract_create", },
  { title: "Дата начала срока страхования", key: "date_start_insurance" },
  { title: "Дата окончания срока страхования", key: "date_end_insurace" },
  { title: "Страховая сумма, руб.", key: "insurance_sum" },
  { title: "b2p", key: "commission_acquiring" },
  { title: "АВ партнера(бонус)", key: "commission_partner" },
  { title: "Страховая премия (бонус страховой)", key: "insurance_bonus" },
  { title: "Премия Сервиса (бонус)", key: "service_bonus" },
  { title: "Нетто Куаргет", key: "netto_qrget" },
  { title: "Дата заявления о расторжении", key: "date_application_termination" },
  { title: "Дата расторжения", key: "date_termination" },
  { title: "Диспут", key: "disput" },
  // { title: 'Тип операции продажа/возврат', key: 'type' },
];

type Options = {
  itemsPerPage: 10,
  page: 2
}

const perPage = [
  { value: 10, title: '10' },
  { value: 20, title: '20' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: 500, title: '500' },
]

const partnersStore = useSalesReturnsStore();
const salesGraphStore = useSalesGraph();
const filtersStore = useFiltersStore();

const handleChangeSelect = (open: boolean) => {
  if (!open) {
    partnersStore.getPartners();
    salesGraphStore.get();
  }
};

const handleChangeOptions = (options: Options) => {
  if (options.itemsPerPage === partnersStore.limit && options.page - 1 === partnersStore.page) return
  partnersStore.setLimit(options.itemsPerPage)
  partnersStore.setPage(options.page - 1)
  partnersStore.getPartners()
}

onMounted(async () => {
  filtersStore.getFilter("customers");
  filtersStore.getFilter("partners");
  filtersStore.getFilter("products");
  await partnersStore.getPartners();
});
</script>

<template>
  <v-container fluid>
    <v-app-bar title="Партнеры" />
    <v-row dense>
      <v-col cols="12" md="3">
        <DateFilter v-model="partnersStore.dates" />
      </v-col>
      <v-col cols="12" md="2">
        <TypeFilter v-model="partnersStore.type" />
      </v-col>
      <v-col cols="12" md="3">
        <Filters v-model="partnersStore.products" :entitys="filtersStore.filters.products" label="Товар"
          @change-filter="handleChangeSelect" />
      </v-col>
      <v-col cols="12" md="4">
        <Filters v-model="partnersStore.partners" :entitys="filtersStore.filters.partners" label="Партнер"
          @change-filter="handleChangeSelect" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <SearchSelect v-model="partnersStore.customers" :entitys="filtersStore.filters.customers" label="Покупатель"
          @change-filter="handleChangeSelect" />
      </v-col>
    </v-row>
    <v-card>
      <v-data-table-server class="no-wrap-table" :disable-sort="true" :show-current-page="true" :headers="headers"
        :loading="partnersStore.isLoading" :items-per-page="partnersStore.limit" :items="partnersStore.data"
        :items-length="partnersStore.size" :items-per-page-options="perPage" @update:options="handleChangeOptions">
        <template #item.datetime_msk="{ item }">
          {{
            new Date(item["datetime_msk"]).toLocaleTimeString().slice(0, -3)
          }} / {{
            new Date(item["datetime_msk"]).toLocaleDateString()
          }}
        </template>
        <template #item.date_contract_create="{ item }">
          {{ new Date(item["datetime_msk"]).toLocaleDateString() }}
        </template>
        <template #item.date_start_insurance="{ item }">
          {{ new Date(item["datetime_msk"]).toLocaleDateString() }}
        </template>
        <template #item.date_end_insurace="{ item }">
          {{ new Date(item["datetime_msk"]).toLocaleDateString() }}
        </template>
        <template #item.disput="{ item }">
          {{ item["disput"] ? "Да" : "Нет" }}
        </template>
        <template #item.birthday="{ item }">
          {{ new Date(item["birthday"]).toLocaleDateString() }}
        </template>
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>
