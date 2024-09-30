<script setup lang="ts">
  import { VDateInput } from 'vuetify/labs/VDateInput'

  const dates = ref(null)
</script>

<template>
  <v-locale-provider locale="ru">

    <v-date-input
      v-model="dates"
      label="Выберите дату"
      multiple="range"
      prepend-icon=""
      prepend-inner-icon="$calendar"
      variant="outlined"
    />
  </v-locale-provider>
</template>
