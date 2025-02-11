<script setup lang="ts">
import { useExpesesGroupStore } from '@/stores/expensesGroup';


const expensesGroupStore = useExpesesGroupStore();

onMounted(() => {
  expensesGroupStore.get()
})

</script>
<template>
  <v-card>
    <v-list bg-color="indigo-lighten-2">
      <Group v-for="group in expensesGroupStore.items" :key="group.id" :group="group"
        @delete:group="expensesGroupStore.del" />
    </v-list>
  </v-card>
</template>
