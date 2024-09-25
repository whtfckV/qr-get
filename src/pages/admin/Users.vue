<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';


const usersStore = useUsersStore();
const { users, settings } = storeToRefs(usersStore)

const items = [
  {title: 'Продажы/возвраты', value:'report_sales_returns'},
  {title: 'Диспуты', value:'report_disput'},
  {title: 'Прибыль', value:'report_profit'},
];

const userSettings = reactive<Record<number, string[]>>({});

const getUserSettings = (userId: string) => {
  settings.value.id
};
</script>

<template>
  <v-app>
    <v-app-bar title="Пользователи"></v-app-bar>
    <v-main tag="section">
      <v-container :fluid="true">
        <v-card>
          <v-list bg-color="indigo-lighten-2">
            <template v-for="(user, index) in users" :key="user.id">
              <v-list-item>
                <v-list-item-title tag="h2" class="text-h6 mb-4">
                  {{ `${user.surname} ${user.name} ${user.patronymic}` }}
                </v-list-item-title>
                <v-select v-model="getUserSettings" :items="items" density="comfortable" label="Дооступные отчеты" multiple chips></v-select>
              </v-list-item>
              <v-divider color="indigo-lighten-5" v-if="index !== users.length - 1"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
