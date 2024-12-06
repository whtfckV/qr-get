<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { reposrtsTypes } from '@/types/settings';
import { RouteLocationRaw, useRouter } from 'vue-router'

type Report = {
  title: string
  icon: string
  link: RouteLocationRaw
}

const router = useRouter()

const reports: Record<reposrtsTypes, Report> = {
  report_profit: { title: 'Отчет о рентабельности', icon: 'mdi-finance', link: 'profit' },
  report_sales_returns: { title: 'Отчет по партнерам', icon: 'mdi-scale-balance', link: 'sellersreturn' },
  report_disput: { title: 'Отчет по диспутам', icon: 'mdi-fire', link: 'disput' },
};

const toggleLogout = () => {
  localStorage.removeItem('authToken')

  router.push('/auth')
}

const userStore = useUserStore()

onMounted(() => {
  userStore.getUserInfo()
  userStore.getSettings()
})
</script>

<template>
  <v-navigation-drawer class="sidebar" expand-on-hover image="@/assets/1.jpg" permanent rail width="300">
    <v-list>
      <v-list-item prepend-icon="mdi-account-circle" :subtitle="userStore.user?.role" :title="userStore.user?.fio" />
    </v-list>

    <v-divider />

    <v-list>
    <template  v-if="userStore.user?.role === 'admin'">
      <v-list-item color="#FF9140" link prepend-icon="mdi-account-multiple"
        title="Пользователи" :to="'/admin/users'" />
      <v-divider thickness="2" />
    </template>

      <template v-if="userStore.settings" v-for="report in Object.keys(userStore.settings) as reposrtsTypes[]" :key="reports[report].title">
        <v-list-item v-if="userStore.settings[report]" color="#FF9140" link :prepend-icon="reports[report].icon" :title="reports[report].title"
          :to="`/reports/${reports[report].link}`" />
        <v-divider v-if="userStore.settings[report]" thickness="2" />
      </template>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn block title="Выйти" @click="toggleLogout">
          <v-icon icon="mdi-logout" />
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style>
.sidebar {
  height: 100%;
}
</style>
