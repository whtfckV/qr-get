<script setup lang="ts">
import { useRouter } from 'vue-router'

type Reports = {
  title: string
  icon: string
  link: string
}

const rail= ref(true)

const router = useRouter()

const reports: Reports[] = [
  {title: "Отчет по партнерам", icon: "mdi-scale-balance", link: "SellersReturn"},
  {title: "Отчет о рентабельности", icon: "mdi-finance", link: "Profit"},
  {title: "Отчет по диспутам", icon: "mdi-fire", link: "Disput"},
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

        :rail="rail"
        permanent
        @click="rail = false"

        >
        <!-- rail -->
        <v-list>
          <v-list-item
            prepend-icon="mdi-account-circle"
            title="My Application"
            subtitle="admin">
            <template v-slot:append>
              <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            prepend-icon="mdi-account-multiple"
            link
            :to="'/Admin'"
            title="Пользователи">
          </v-list-item>
          <v-list-item
            v-for="report in reports"
            :prepend-icon=report.icon
            link
            :to="`/reports/${report.link}`"
            :title=report.title>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn prepend-icon="mdi-logout" @click="toggleLogout" title="Выйти" block />
          </div>
        </template>
      </v-navigation-drawer>
</template>
