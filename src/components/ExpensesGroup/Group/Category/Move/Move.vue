<script setup lang="ts">
import { Props } from '../types';
import { Emits } from './types';
import { useExpesesGroupStore } from '@/stores/expensesGroup';

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const groupsStore = useExpesesGroupStore()
const selectedGroup = ref('')

const handleAdd = () => {
  groupsStore.moveCategory(props.category.id, selectedGroup.value, props.group.id)
  emit('close')
}

onMounted(() => {
  groupsStore.getOnlyGroups()
})

</script>

<template>
  <v-card>
    <v-form @submit.prevent="handleAdd">
      <v-card-title class="text-h5">
        Пееремещение категории
      </v-card-title>
      <v-card-subtitle>
        {{ category.name }} из группы {{ group.name }}
      </v-card-subtitle>
      <v-card-text>
        <v-select v-model="selectedGroup" :loading="groupsStore.isLoading" label="Выберите категорию"
          :items="groupsStore.groups" item-title="name" item-value="id" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="grey-darken-1" variant="text" @click="emit('close')">
          Отмена
        </v-btn>
        <v-btn type="submit" color="success" variant="text">
          Переместить
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
