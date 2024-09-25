<script setup lang="ts">
  import { useUsersStore } from '@/stores/users'
  import { storeToRefs } from 'pinia'

  const usersStore = useUsersStore()
  const { users } = storeToRefs(usersStore)

  // const items = [
  //   { title: 'Продажы/возвраты', value: 'report_sales_returns' },
  //   { title: 'Диспуты', value: 'report_disput' },
  //   { title: 'Прибыль', value: 'report_profit' },
  // ]

  // const userSettings = reactive<Record<number, string[]>>({})

  // const getUserSettings = (userId: string) => {
  //   settings.value.id
  // }
</script>

<template>
  <v-app>
    <v-app-bar title="Пользователи" />
    <v-main tag="section">
      <v-container :fluid="true">
        <v-card>
          <v-list bg-color="indigo-lighten-2">
            <template v-for="(user, index) in users" :key="user.id">
              <v-list-item>
                <v-list-item-title class="text-h6 mb-4" tag="h2">
                  {{ `${user.surname} ${user.name} ${user.patronymic}` }}
                </v-list-item-title>
                <!-- <v-select
                  v-model="getUserSettings"
                  chips
                  density="comfortable"
                  :items="items"
                  label="Дооступные отчеты"
                  multiple
                /> -->
              </v-list-item>
              <v-divider v-if="index !== users.length - 1" color="indigo-lighten-5" />
            </template>
          </v-list>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
