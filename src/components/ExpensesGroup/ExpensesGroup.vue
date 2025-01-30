<script setup lang="ts">
import { useExpesesGroupStore } from '@/stores/expensesGroup';


const expensesGroupStore = useExpesesGroupStore();
const obj: Record<string, boolean> = {}
expensesGroupStore.items.map((group) => {
  obj[group.id] = false
})
const dialogDelete = ref(obj)

onMounted(() => {
  expensesGroupStore.get()
})

</script>
<template>
  <v-card>
    <v-list bg-color="indigo-lighten-2">
      <v-list-group v-for="(group, index) in expensesGroupStore.items" :key="group.id" :value="group.name">
        <template #activator="{ props }">
          <v-list-item v-bind="props">
            <v-row align="center" no-gutters>
              <v-col>
                <v-list-item-title>{{ group.name }}</v-list-item-title>
              </v-col>
              <v-col cols="auto">
                <v-btn variant="text" icon="mdi-plus" />
                <Confirmation v-model="dialogDelete[group.id]" title="Удалить группу?"
                  :message="`Вы уверены что хотите удалить группу ${group.name}? Это действие нельзя будет отменить, так же ее больше не будет видно в отчетках`"
                  confirm-text="Удалить" cancel-text="Отмена" @confirm="expensesGroupStore.del(group.id)">
                  <template #activator="{ props }">
                    <v-btn v-bind="props" variant="text" icon="mdi-delete"></v-btn>
                  </template>
                </Confirmation>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider thickness="2" color="indigo-lighten-5" v-if="index !== expensesGroupStore.items.length - 1" />
        </template>

        <v-list-item v-for="category in group.items" :key="category.id">
          <v-list-item-content>
            <v-list-item-title>{{ category.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>
