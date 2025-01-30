<script setup lang="ts">
import { useExpesesGroupStore } from '@/stores/expensesGroup';
import Move from './Move/Move.vue';
import { Props } from './types';

const props = defineProps<Props>()
const groupStore = useExpesesGroupStore()
const dialogRemove = ref(false)
const dialogMove = ref(false)

const handleRemove = () => {
  groupStore.deleteCategory(props.category.id, props.group.id)
  }
</script>

<template>
  <v-list-item :key="category.id">
    <v-row>
      <v-col>
        <v-list-item-title>{{ category.name }}</v-list-item-title>
      </v-col>
      <v-col cols="auto">
        <v-dialog v-model="dialogMove" max-width="600">
          <template #activator="{ props: activatorProps }">
            <v-btn title="Переместить" v-bind="activatorProps" variant="text" icon="mdi-arrow-left-right" />
          </template>
          <Move @close="dialogMove = false" :category="category" :group="group" />
        </v-dialog>
        <Confirmation v-model="dialogRemove" :title="`Убрать категорию из группы ${group.name}?`"
          :message="`Вы уверены что хотите убрать категорию ${category.name} из группы ${group.name}? Эта категория больше ну бедт отображаться в данной группе в отчете ОПиУ`"
          @confirm="handleRemove">
          <template #activator="{ props }">
            <v-btn title="Удалить" v-bind="props" variant="text" icon="mdi-minus-circle"></v-btn>
          </template>
        </Confirmation>
      </v-col>
    </v-row>
  </v-list-item>
</template>
