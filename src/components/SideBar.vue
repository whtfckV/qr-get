<script setup lang="ts">
  import { useRouter } from 'vue-router'

  type Reports = {
    title: string
    icon: string
    link: string
  }

  const rail = ref(true)

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
</script>

<template>
  <!-- :width="200" -->
  <v-navigation-drawer
    image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    permanent
    :rail="rail"
    @click="rail = false"
  >
    <!-- rail -->
    <v-list>
      <v-list-item prepend-icon="mdi-account-circle" subtitle="admin" title="My Application">
        <template #append>
          <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail" />
        </template>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list>
      <v-list-item link prepend-icon="mdi-account-multiple" title="Пользователи" :to="'/admin/Users'" />
      <v-list-item
        v-for="report in reports"
        :key="report.title"
        link
        :prepend-icon="report.icon"
        :title="report.title"
        :to="`/reports/${report.link}`"
      />
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
