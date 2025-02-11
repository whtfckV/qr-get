<script setup lang="ts">
  import { ReportType } from '@/types/reports/sales_return'

  const partners = [
    { title: 'Продажа', value: 'sell' },
    { title: 'Возврат', value: 'return' },
  ]

  const model = defineModel<ReportType>()

</script>

<template>
  <v-select
    v-model="model"
    :items="partners"
    label="Тип операции"
    persistent-hint
    single-line
    variant="outlined"
  />
</template>
