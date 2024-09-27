<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import { useRouter } from 'vue-router'

  type Reports = {
    title: string
    icon: string
    link: string
  }

  const router = useRouter()

  const reports: Reports[] = [
    { title: 'Отчет по партнерам', icon: 'mdi-scale-balance', link: 'SellersReturn' },
    { title: 'Отчет о рентабельности', icon: 'mdi-finance', link: 'Profit' },
    { title: 'Отчет по диспутам', icon: 'mdi-fire', link: 'Disput' },
  ]

  const toggleLogout = () => {
    localStorage.removeItem('authToken')

    router.push('/Auth')
  }

  const userStore = useUserStore()

  onMounted(() => {
    userStore.getUserInfo()
  })
</script>

<template>
  <v-navigation-drawer
    expand-on-hover
    image="@/assets/1.jpg"
    permanent
    rail
    width="300"
  >
    <v-list>
      <v-list-item prepend-icon="mdi-account-circle" :subtitle="userStore.user?.role" :title="userStore.user?.fio" />
    </v-list>

    <v-divider />

    <v-list>
      <v-list-item
        v-if="userStore.user?.role==='admin'"
        color="#FF9140"
        link
        prepend-icon="mdi-account-multiple"
        title="Пользователи"
        :to="'/admin/Users'"
      />
      <v-divider thickness="2" />
      <template v-for="report in reports" :key="report.title">
        <v-list-item
          color="#FF9140"
          link
          :prepend-icon="report.icon"
          :title="report.title"
          :to="`/reports/${report.link}`"
        />
        <v-divider thickness="2" />
      </template>

    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn
          block
          prepend-icon="mdi-logout"
          title="Выйти"
          @click="toggleLogout"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>
