<script setup lang="ts">
import ExpensesGroup from '@/components/ExpensesGroup/ExpensesGroup.vue';
import { useExpesesGroupStore } from '@/stores/expensesGroup';

const expensesGroupStore = useExpesesGroupStore()
const dialog = ref(false)
const newGroup = ref('')

const handleAdd = () => {
  if (newGroup.value) {
    expensesGroupStore.add(newGroup.value)
    dialog.value = false
    newGroup.value = ''
  }
}
</script>

<template>
  <v-app-bar title="Группы расходов">
    <v-dialog v-model="dialog" max-width="500">
      <template #activator="{ props: activatorProps }">
        <v-btn variant="tonal" color="indigo-lighten-2" class="mr-4" v-bind="activatorProps">Добавить</v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="handleAdd">
          <v-card-title class="text-h5">
            Добавить группу
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="newGroup" label="Название" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="grey-darken-1" variant="text" @click="dialog = false">
              Отмена
            </v-btn>
            <v-btn color="success" variant="text" type="submit">
              Добавить
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <!-- <template #default="{ onClose }">
        <ExpensesGroupForm @close="onClose" />
      </template> -->
    </v-dialog>
  </v-app-bar>
  <v-container fluid>
    <ExpensesGroup />
  </v-container>
</template>
