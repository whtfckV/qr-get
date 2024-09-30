<script setup lang="ts">
  import { useSalesReturnsStore } from '@/stores/reports/sales_return'
  import { SellersReturn } from '@/types/reports/sales_return'
  import { useFiltersCustomersStore } from '@/stores/reports/filters/filters_customers'
  import { useFiltersPartnersStore } from '@/stores/reports/filters/filters_partners'
  import { useFiltersProductsStore } from '@/stores/reports/filters/filters_products'

  const headers: {title: string, key: keyof SellersReturn | 'id' }[] = [
    { title: 'Номер п/п', key: 'id' },
    { title: 'ИД сектора', key: 'sector_id' },
    { title: 'Название сектора', key: 'sector_name' },
    { title: 'Номер сертификата', key: 'cert_number' },
    { title: 'ИД заказа', key: 'order_id' },
    { title: 'ИД заказа партнера', key: 'order_partner_id' },
    { title: 'Дата/время (МСК)', key: 'datetime_msk' },
    { title: 'ФИО', key: 'fio' },
    { title: 'Паспортные данные', key: 'passport_info' },
    { title: 'Дата рождения', key: 'birthday' },
    { title: 'Email клиента', key: 'email' },
    { title: 'Номер телефона клиента', key: 'phone' },
    { title: 'Пакет ДЗ', key: 'packet_dz' },
    { title: 'Стоимость услуги', key: 'sum' },
    { title: 'PAN Застрахованной карты', key: 'card' },
    { title: 'Дата подписания Держателем карты Заявления о включении', key: 'date_contract_create' },
    { title: 'Дата начала срока страхования', key: 'date_start_insurance' },
    { title: 'Дата окончания срока страхования', key: 'date_end_insurance' },
    { title: 'Страховая сумма, руб.', key: 'insurance_sum' },
    { title: 'b2p', key: 'commision_acquiring' },
    { title: 'АВ партнера(бонус)', key: 'partner_bonus' },
    { title: 'Страховая премия (бонус страховой)', key: 'insurance_bonus' },
    { title: 'Премия Сервиса (бонус)', key: 'service_bonus' },
    { title: 'Нетто Куаргет', key: 'netto_qrget' },
    { title: 'Дата заявления о расторжении', key: 'date_application_termination' },
    { title: 'Дата расторжения', key: 'date_termination' },
    { title: 'Диспут', key: 'disput' },
    { title: 'Тип операции продажа/возврат', key: 'type' },
  ]

  const partnersStore = useSalesReturnsStore()
  const filterCustomerStore = useFiltersCustomersStore()
  const filterPartnersStore = useFiltersPartnersStore()
  const filterProductsStore = useFiltersProductsStore()

  onMounted(async () => {
    await partnersStore.getPartners()
    filterCustomerStore.getFilter()
    filterPartnersStore.getFilter()
    filterProductsStore.getFilter()
  })

</script>

<template>
  <v-app>
    <v-main tag="section">
      <v-container :fluid="true">
        <v-app-bar title="Партнеры" />
        <v-row dense>
          <v-col cols="12" md="1" />

          <v-col cols="12" md="2">
            <DateFilter />
          </v-col>
          <v-col cols="12" md="2">
            <TypeFilter />
          </v-col>
          <v-col cols="12" md="2">
            <Filters :entitys="filterCustomerStore.filters" label="Покупатель" />
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
          :items="partnersStore.partners"
          :show-rows-border="true"
        >
          <template #item="{ index, item }">
            <tr>
              <td v-for="header in headers" :key="header.key">
                {{ header.key in item ? item[header.key] : index + 1 }}
              </td>
            </tr>
          </template>

        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>
