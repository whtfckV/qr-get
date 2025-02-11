<template>
  <v-dialog v-model="showDialog" max-width="500" persistent>
    <template #activator="{ props: activatorProps }">
      <slot name="activator" v-bind="{ props: activatorProps }">
        <v-btn color="error" v-bind="activatorProps">
          Удалить
        </v-btn>
      </slot>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-text>
          {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="grey-darken-1" variant="text" @click="cancel">
          {{ cancelText }}
        </v-btn>
        <v-btn color="error" variant="text" @click="confirm">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Подтвердите удаление',
  message: 'Вы уверены что хотите удалить этот элемент?',
  confirmText: 'Удалить',
  cancelText: 'Отмена'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const showDialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const confirm = () => {
  emit('confirm')
  showDialog.value = false
}

const cancel = () => {
  showDialog.value = false
  emit('cancel')
}
</script>
