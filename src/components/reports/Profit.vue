<script setup lang="ts">
  const headers = [
    { title: 'Партнер', key: 'name' },
    { title: 'Успешнные платежи', key: 'name' },
    { title: 'Средняя Сумма услуги, руб.', key: 'name' },
    { title: 'Общая сумма услуги, руб.', key: 'name' },
    { title: 'Сумма вознаграждения b2p, руб.', key: 'name' },
    { title: 'Количесво возвратов, шт.', key: 'name' },
    { title: 'Возвраты, руб.', key: 'name' },
    { title: '% возвратовб шт.', key: 'name' },
    { title: '% возвратов, руб.', key: 'name' },
    { title: 'Сумма услуги за минусом вознаграждения b2p и возвратов, руб.', key: 'name' },
    { title: 'Общая сумма вознаграждения партнера, руб.', key: 'name' },
    { title: 'Общая сумма вознаграждения D2 + ВСК, руб.', key: 'name' },
    { title: 'Общая сумма вознаграждения ДЗ, руб.', key: 'name' },
    { title: 'Прибыль до налога КУАРГЕТ, руб.', key: 'name' },
  ]
  const profits = [
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
  <v-app>
    <v-main tag="section">
      <v-container :fluid="true">
        <v-app-bar title="Рентабельность" />
        <v-data-table
          :headers="headers"
          item-value="name"
          :items="profits"
          :show-rows-border="true"
        >
          <template #item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.partner }}</td>

            </tr>
          </template>

        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>
