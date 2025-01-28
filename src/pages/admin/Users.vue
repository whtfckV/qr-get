<script setup lang="ts">
import { useUsersStore } from '@/stores/users'
import { reposrtsTypes, tablesTypes } from '@/types/settings'
import { storeToRefs } from 'pinia'

type Items = {
  title: string
  value: reposrtsTypes | tablesTypes
}

const usersStore = useUsersStore()
const { users, usersSettings } = storeToRefs(usersStore)
const dialog = ref(false)
const dialogDelete = ref(false)
const deleteId = ref()
const snackbar = ref(false)

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  dialog.value = false
}

const handleSuccess = () => {
  snackbar.value = true
  usersStore.getUsersWithSettings()
}

const handleDelete = (id: string) => {
  dialogDelete.value = true
  deleteId.value = id
}

const deleteItem = () => {
  usersStore.deleteCurrentUser(deleteId.value)
  deleteId.value = ''
  dialogDelete.value = false
}

const items: Items[] = [
  { title: 'Продажи/возвраты', value: 'report_sales_returns' },
  { title: 'Диспуты', value: 'report_disput' },
  { title: 'Прибыль', value: 'report_profit' },
  { title: 'Таблица диспутов', value: 'table_disput' },
  { title: 'Точка контроля средств', value: 'table_verification_payments' },
  { title: 'ДДС', value: 'table_dds' },
  { title: 'ОПиУ', value: 'table_opiu' },
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
      <v-btn base-color="indigo-lighten-2" class="mr-4" prepend-icon="mdi-account-plus" variant="tonal"
        @click="openDialog">
        Добавить
      </v-btn>
    </v-app-bar>
    <v-main tag="section">
      <v-container fluid>
        <v-card>
          <v-list v-if="users.length" bg-color="indigo-lighten-2">
            <template v-for="(user, index) in users" :key="user.id">
              <v-list-item>
                <v-list-item-title class="d-flex mb-4">
                  <h2 class="text-h6">
                    {{ `${user.surname} ${user.name} ${user.patronymic || ''}` }}
                  </h2>
                  <v-spacer />
                  <v-btn @click="() => handleDelete(user.id)">
                    Удалить
                  </v-btn>
                </v-list-item-title>
                <v-select v-model="usersSettings[user.id]" chips clearable density="comfortable" :items="items"
                  label="Доступные отчеты" multiple variant="outlined"
                  @update:focused="(e: boolean) => handleFocus(e, user.id)" />
              </v-list-item>
              <v-divider v-if="index !== users.length - 1" color="indigo-lighten-5" />
            </template>
          </v-list>
        </v-card>
        <!-- Модальное окно -->
        <v-dialog v-model="dialog" max-width="500">
          <AddUsers :close-dialog @success="handleSuccess" />
        </v-dialog>
        <!-- Диалоговое окно подтверждения -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Подтверждение удаления</v-card-title>
            <v-card-text>
              Вы уверены, что хотите удалить этого пользователя?
              Это действие необратимо.
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <!-- Кнопка отмены -->
              <v-btn color="grey" @click="dialogDelete = false">
                Отмена
              </v-btn>
              <!-- Кнопка удаления -->
              <v-btn color="red" @click="deleteItem">
                Удалить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Уведомление -->
        <v-snackbar v-model="snackbar" color="success" location="top right" :timeout="2000">
          Пользователь создан
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>
