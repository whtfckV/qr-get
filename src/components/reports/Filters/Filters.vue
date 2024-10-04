<script setup lang="ts">
  import { useFiltersStore } from '@/stores/reports/filters'
  import type{ FilterEntity } from '@/types/reports/filters'

  const filtersStore = useFiltersStore()
  const props = defineProps<{ entitys: FilterEntity[] }>()

  type Emits = {
    changeFilter: []
  }

  const emit = defineEmits<Emits>()
</script>

<template>
  <v-select
    v-model="filtersStore.filters.selectedCustomers"
    item-title="name"
    item-value="id"
    :items="props.entitys"
    label="Покупатель"
    multiple
    variant="outlined"
    @update:model-value="() => emit('changeFilter')"
  />
</template>
