<script setup lang="ts">
  import { useUsersStore } from '@/stores/users'
  import { storeToRefs } from 'pinia'

  const usersStore = useUsersStore()
  const { users, usersSettings } = storeToRefs(usersStore)

  const items = [
    { title: 'Продажы/возвраты', value: 'report_sales_returns' },
    { title: 'Диспуты', value: 'report_disput' },
    { title: 'Прибыль', value: 'report_profit' },
  ]

  const handleFocus = (bool: boolean, id: string) => {
    if (!bool) {
      usersStore.updateLocalSettings(id)
    }
  }

  onMounted(() => {
    usersStore.getUsersWithSettings()
  })
</script>

<template>
  <v-app>
    <v-app-bar title="Пользователи">
      <template #append>
        <v-btn
          base-color="indigo-lighten-2"
          prepend-icon="mdi-account-plus"
          variant="tonal"
        >
          Добавить
        </v-btn>
      </template>
    </v-app-bar>
    <v-main tag="section">
      <v-container fluid>
        <v-card>
          <v-list v-if="users.length" bg-color="indigo-lighten-2">
            <template v-for="(user, index) in users" :key="user.id">
              <v-list-item>
                <v-list-item-title class="text-h6 mb-4" tag="h2">
                  {{ `${user.surname} ${user.name} ${user.patronymic || ''}` }}
                </v-list-item-title>
                <v-select
                  v-model="usersSettings[user.id]"
                  chips
                  clearable
                  density="comfortable"
                  :items="items"
                  label="Доступные отчеты"
                  multiple
                  variant="outlined"
                  @update:focused="(e) => handleFocus(e, user.id)"
                />
              </v-list-item>
              <v-divider v-if="index !== users.length - 1" color="indigo-lighten-5" />
            </template>
          </v-list>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
