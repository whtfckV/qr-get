<script setup lang="ts">
  // import { useFiltersStore } from '@/stores/reports/filters'
  import type{ FilterEntity } from '@/types/reports/filters'

  // const filtersStore = useFiltersStore()
  const props = defineProps<{ entitys: FilterEntity[] }>()
  const model = defineModel<FilterEntity[]>()

  type Emits = {
    changeFilter: [e: boolean]
  }

  const emit = defineEmits<Emits>()
</script>

<template>
  <v-select
    v-model="model"
    item-title="name"
    item-value="id"
    :items="props.entitys"
    label="Покупатель"
    multiple
    variant="outlined"
    @update:menu="(e) => emit('changeFilter', e)"
  />
</template>
