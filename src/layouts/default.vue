<script lang="ts" setup>
const overlay = ref(false)
</script>

<template>
  <SideBar />
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-overlay class="align-center justify-center" :model-value="overlay">
      <v-progress-circular color="primary" indeterminate size="64" />
    </v-overlay>
  </v-app>
</template>
