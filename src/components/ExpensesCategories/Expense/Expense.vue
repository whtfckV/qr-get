<script setup lang="ts">
import { ExpenseCategory } from '@/types/expenses';
import { Confirmation } from '@/components/Confirmation';
import { Emit, Props } from './types';

defineProps<Props>()
const emit = defineEmits<Emit>()
const dialogDelete = ref(false)
const selectedCategory = ref<string>();

const handleFocus = (focus: boolean, category: ExpenseCategory) => {
  if (focus) {
    selectedCategory.value = category.name
  } else {
    if (selectedCategory.value !== category.name) {
      if (category.id.startsWith('add')) {
        emit('add', category.id, category.name)
      } else {
        emit('update', category)
      }
    }
    selectedCategory.value = ''
  }
}
</script>

<template>
  <v-list-item tag="li">
    <v-text-field density="compact" v-model="category.name" hide-details="auto"
      @update:focused="(focus: boolean) => handleFocus(focus, category)">
      <template #append>
        <Confirmation v-model="dialogDelete" title="Архивировать категорию?" :message="`Вы уверены что хотите архивировать категорию ${category.name}? \n
                  Это действие нельзя будет отменить \n
                  Вы больше не сможете выбрать ее при добавлении расхода`" confirm-text="Архивировать"
          @confirm="() => emit('archive', category.id)" :key="category.id">
          <template #activator="{ props }">
            <v-btn title="Архивировать" color="red" variant="tonal" v-bind="props" icon="mdi-archive" :key="category.id" />
          </template>
        </Confirmation>
      </template>
    </v-text-field>
  </v-list-item>
</template>
