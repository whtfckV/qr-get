<script setup lang="ts">
  import { useFiltersStore } from '@/stores/reports/filters'
  import { VDateInput } from 'vuetify/labs/VDateInput'

  const filtersStore = useFiltersStore()

  type Emits = {
    changeDate: []
  }

  const emit = defineEmits<Emits>()
</script>

<template>
  <v-locale-provider locale="ru">

    <v-date-input
      v-model="filtersStore.filters.dates"
      label="Выберите дату"
      multiple="range"
      prepend-icon=""
      prepend-inner-icon="$calendar"
      variant="outlined"
      @update:blur="() => emit('changeDate')"
    />
  </v-locale-provider>
</template>
