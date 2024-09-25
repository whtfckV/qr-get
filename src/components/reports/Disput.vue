<script setup lang="ts">
  const headers = [
    { title: 'Период', key: 'name' },
    { title: 'Партнер', key: 'partner' },
    { title: 'Успешные платежи, шт', key: 'partner' },
    { title: 'Общая сумма услуг, руб', key: 'partner' },
    { title: 'Количество диспутов', key: 'partner' },
    { title: 'Сумма диспутов', key: 'partner' },
    { title: '% диспутов по количеству', key: 'partner' },
    { title: '% диспутов по сумме', key: 'partner' },
  ]
  const desserts = [
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
        <v-app-bar title="Диспуты" />

        <!-- <Filter /> -->
        <v-data-table
          :headers="headers"
          item-value="name"
          :items="desserts"
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
