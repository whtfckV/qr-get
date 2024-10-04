<script setup lang="ts">
  const selectedType = { title: 'Продажа', value: 'sell' }
  const partners = [
    { title: 'Продажа', value: 'sell' },
    { title: 'Возврат', value: 'return' },
  ]

  type Emits = {
    changeType: []
  }

  const emit = defineEmits<Emits>()
</script>

<template>
  <v-select
    v-model="selectedType"
    :items="partners"
    label="Тип операции"
    persistent-hint
    return-object
    single-line
    variant="outlined"
    @update:model-value="() => emit('changeType')"
  />

</template>
