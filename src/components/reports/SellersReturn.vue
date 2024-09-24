<script setup lang="ts">
const headers = [
  { title: 'Номер п/п', key: 'name' },
  { title: 'ИД сектора', key: 'name' },
  { title: 'Название сектора', key: 'name' },
  { title: 'Номер сертификата', key: 'name' },
  { title: 'ИД заказа', key: 'name' },
  { title: 'ИД заказа партнера', key: 'name' },
  { title: 'Дата/время (МСК)', key: 'name' },
  { title: 'ФИО', key: 'name' },
  { title: 'Паспортные данные', key: 'name' },
  { title: 'Дата рождения', key: 'name' },
  { title: 'Email клиента', key: 'name' },
  { title: 'Номер телефона клиента', key: 'name' },
  { title: 'Пакет ДЗ', key: 'name' },
  { title: 'Стоимость услуги', key: 'name' },
  { title: 'PAN Застрахованной карты', key: 'name' },
  { title: 'Дата подписания Держателем карты Заявления о включении', key: 'name' },
  { title: 'Дата начала срока страхования', key: 'name' },
  { title: 'Дата окончания срока страхования', key: 'name' },
  { title: 'Страховая сумма, руб.', key: 'name' },
  { title: 'b2p', key: 'name' },
  { title: 'АВ партнера(бонус)', key: 'name' },
  { title: 'Страховая премия (бонус страховой)', key: 'name' },
  { title: 'Премия Сервиса (бонус)', key: 'name' },
  { title: 'Нетто Куаргет', key: 'name' },
  { title: 'Дата заявления о расторжении', key: 'name' },
  { title: 'Дата расторжения', key: 'name' },
  { title: 'Диспут', key: 'name' },
  { title: 'Тип операции продажа/возврат', key: 'name' },
]

const partners = [
{
    name: 'Frozen Yogurt',
    partner: 159,
  },
  {
    name: 'Ice cream sandwich',
    partner: 237,
  },
]
</script>

<template>
  SellersReturn
  <v-data-table
    :headers="headers"
    :items="partners"
    item-value="name"
    :show-rows-border="true"
  >
  <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.partner }}</td>

      </tr>
    </template>

  </v-data-table>
</template>
