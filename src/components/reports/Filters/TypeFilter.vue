<script setup lang="ts">
  const partners = [
    { title: 'Все', value: 'all' },
    { title: 'Продажа', value: 'sells' },
    { title: 'Возврат', value: 'returns' },
  ]
</script>

<template>
  <v-select
    :items="partners"
    label="Партнер"
    variant="outlined"
  />

</template>
