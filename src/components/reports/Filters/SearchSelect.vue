<script setup lang="ts">
  // import { useFiltersStore } from '@/stores/reports/filters'
  import type{ FilterEntity } from '@/types/reports/filters'

  // const filtersStore = useFiltersStore()
  const props = defineProps<{ entitys: FilterEntity[] }>()
  const model = defineModel<string[]>()

  type Emits = {
    changeFilter: [e: boolean]
  }

  const emit = defineEmits<Emits>()
</script>

<template>
    <v-autocomplete
      v-model="model"
      :items="props.entitys"
      multiple
      chips
      clearable
      small-chips
      hide-selected
      variant="outlined"
      item-title="name"
      item-value="id"
      @update:menu="(e) => emit('changeFilter', e)"
    />
</template>
