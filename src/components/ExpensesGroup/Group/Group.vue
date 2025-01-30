<script setup lang="ts">
import Category from './Category/Category.vue';
import { Emits, Props } from './types';

defineProps<Props>()
const emit = defineEmits<Emits>()

const dialogDelete = ref(false)
const dialogAdd = ref(false)

</script>

<template>
  <v-list-group :key="group.id" :value="group.name">
    <template #activator="{ props }">
      <v-list-item v-bind="props">
        <v-row align="center" no-gutters>
          <v-col>
            <v-list-item-title>{{ group.name }}</v-list-item-title>
          </v-col>
          <v-col cols="auto">
            <v-dialog v-model="dialogAdd" max-width="500">
              <template #activator="{ props: activatorProps }">
                <v-btn title="Добавить группу" v-bind="activatorProps" variant="text" icon="mdi-plus" />
              </template>
              <AddExpenseIntoGroup @close="dialogAdd = false" :group="group" />
            </v-dialog>
            <Confirmation v-model="dialogDelete" title="Удалить группу?"
              :message="`Вы уверены что хотите удалить группу ${group.name}? Это действие нельзя будет отменить, так же ее больше не будет видно в отчетках`"
              confirm-text="Удалить" cancel-text="Отмена" @confirm="() => emit('delete:group', group.id)">
              <template #activator="{ props }">
                <v-btn title="Удалить" v-bind="props" variant="text" icon="mdi-delete"></v-btn>
              </template>
            </Confirmation>
          </v-col>
        </v-row>
      </v-list-item>
    </template>
    <Category v-for="category in group.items" :key="category.id" :category="category" :group="group" />
  </v-list-group>
</template>
