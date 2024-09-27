<script setup lang="ts">
  import type{ FilterEntityTranformed } from '@/types/reports/filters'

  // import DateFilter from './DateFilter.vue'
  // import { useFiltersStore } from '@/stores/reports/filters'

  const props = defineProps<{ entitys: FilterEntityTranformed[] }>()
  // const filterStore = useFiltersStore()
  console.log(props.entitys)

  // onMounted(() => {
  //   filterStore.getFilter(props.type)
  // })
</script>

<template>
  <v-select
    :items="props.entitys"
    label="Покупатель"
    variant="outlined"
  />
</template>
