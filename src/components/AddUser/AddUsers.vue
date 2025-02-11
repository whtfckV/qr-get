<script setup lang="ts">
  import { useNewUserStore } from '@/stores/newUser'
  import { Emits, Props } from './types'

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const newUser = useNewUserStore()
  const valid = ref(false)
  const showPassword = ref(false)
  const rules = {
    required: (value: string) => !!value || 'Обязательное поле',
  }

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }

  const handleSuccess = () => {
    props.closeDialog()
    emit('success')
  }

  const submitForm = () => {
    if (valid.value) {
      newUser.register(handleSuccess)
    }
  }
</script>
<template>

  <v-card>
    <v-card-title>
      <h5 class="text-h5">Добавление пользователя</h5>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" :disabled="newUser.loading">
        <!-- Поле Фамилия -->
        <v-text-field
          v-model="newUser.surname"
          label="Фамилия"
          required
          :rules="[rules.required]"
          variant="outlined"
        />

        <!-- Поле Имя -->
        <v-text-field
          v-model="newUser.name"
          label="Имя"
          required
          :rules="[rules.required]"
          variant="outlined"
        />

        <!-- Поле Отчество (необязательное) -->
        <v-text-field v-model="newUser.patronymic" label="Отчество" variant="outlined" />

        <!-- Поле Логин -->
        <v-text-field
          v-model="newUser.username"
          label="Логин"
          required
          :rules="[rules.required]"
          variant="outlined"
        />

        <!-- Поле Пароль -->
        <v-text-field
          v-model="newUser.password"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Пароль"
          required
          :rules="[rules.required]"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          @click:append-inner="togglePasswordVisibility"
        />
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" @click="closeDialog">Отмена</v-btn>
      <v-btn color="blue darken-1" :loading="newUser.loading" @click="submitForm">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>
