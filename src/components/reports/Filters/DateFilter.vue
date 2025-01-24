<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'

const model = defineModel<Date[]>()

</script>

<template>
  <v-locale-provider locale="ru">
    <v-date-input v-model="model" label="Выберите дату" multiple="range" prepend-icon="" prepend-inner-icon="$calendar"
      variant="outlined" hide-details="auto" />
  </v-locale-provider>
</template>
