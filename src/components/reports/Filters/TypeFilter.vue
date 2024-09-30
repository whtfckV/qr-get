<script setup lang="ts">
  const partners = [
    { title: 'Продажа', value: 'sells' },
    { title: 'Возврат', value: 'returns' },
  ]
</script>

<template>
  <v-select
    :items="partners"
    label="Тип операции"
    variant="outlined"
  />

</template>
