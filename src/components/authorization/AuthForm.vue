<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watch } from 'vue'
  import UIButton from './UIButton.vue'
  import UIInput from './UIInput.vue'
  import UICheckbox from './UICheckbox.vue'

  export type tDataLogin = {
    login: string;
    password: string;
    rememberMe: boolean;
  };

  export type tDataSignUp = {
    login: string;
    password: string;
  };

  export type tDataForget = {
    login: string;
  };

  type Emits = {
    error: [];
    loginSuccess: [data: tDataLogin];
    // signUpSuccess: [data: tDataSignUp],
    forgetPassword: [data: tDataForget];
  };

  const emit = defineEmits<Emits>()

  const login = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const rememberMe = ref(false)
  const loginError = ref('')
  const passwordError = ref('')
  // const passwordConfirmError = ref('')
  const hash = ref('')
  const btnDescr = ref('Войти')
  const title = ref('Вход')

  const handleSubmit = () => {
    if (!login.value) {
      loginError.value = 'Поле не должно быть пустым'
      emit('error')
      return
    }
    if (!password.value) {
      passwordError.value = 'Поле не должно быть пустым'
      emit('error')
      return
    }

    // if (hash.value === '#sign-up') {
    //   if (!passwordConfirm.value) {
    //     passwordConfirmError.value = 'Поле не должно быть пустым'
    //     emit('error')
    //     return
    //   }
    //   if (passwordConfirm.value !== password.value) {
    //     passwordConfirmError.value = 'Пароли не совпадают'
    //     emit('error')
    //     return
    //   }
    // }

    if (hash.value === '') {
      emit('loginSuccess', {
        login: login.value,
        password: password.value,
        rememberMe: rememberMe.value,
      })
      return
    }

    // if (hash.value === '#sign-up') {
    //   emit('signUpSuccess', { login: login.value, password: password.value })
    //   return
    // }

    if (hash.value === '#forget') {
      emit('forgetPassword', { login: login.value })
      return null
    }
  }

  const handleUpdateLogin = () => (loginError.value = '')
  const handleUpdatePassword = () => (passwordError.value = '')
  // const handleUpdatePasswordConfirm = () => passwordConfirmError.value = ''
  const handleHashChange = () => {
    hash.value = window.location.hash
  }

  watch(hash, () => {
    passwordConfirm.value = ''
    rememberMe.value = false
    loginError.value = ''
    passwordError.value = ''
    // passwordConfirmError.value = ''

    if (hash.value === '') {
      btnDescr.value = 'Войти'
      title.value = 'Вход'
    // } else if (hash.value === '#sign-up') {
    //   btnDescr.value = 'Зарегистрироваться'
    //   title.value = 'Регистрация'
    } else if (hash.value === '#forget') {
      btnDescr.value = 'Восстановить пароль'
      title.value = 'Восстановление пароля'
    }
  })

  onMounted(() => {
    window.addEventListener('hashchange', handleHashChange)
    if (window.location.hash) {
      hash.value = window.location.hash
    }
  })

  onUnmounted(() => {
    window.removeEventListener('hashchange', handleHashChange)
  })
</script>

<template>
  <form action="#" class="login" @submit.prevent="handleSubmit">
    <fieldset class="login__field">
      <legend class="login__legend">
        <h1 class="login__title">{{ title }}</h1>
      </legend>
      <div class="login__input-group">
        <label for="username"><strong>Логин</strong></label>
        <UIInput
          id="username"
          v-model.trim="login"
          v-model:error="loginError"
          name="username"
          placeholder="Введите логин"
          type="text"
          @update:model-value="handleUpdateLogin"
        />
        <span v-if="loginError" :aria-errormessage="loginError" class="login__error">{{ loginError }}</span>
      </div>
      <div v-if="hash !== '#forget'" class="login__input-group login__password-group">
        <label for="password"><strong>Пароль</strong></label>
        <a v-if="hash === ''" class="login__link password__forget" href="#forget">Забыли пароль?</a>
        <UIInput
          id="password"
          v-model.trim="password"
          v-model:error="passwordError"
          class="login__password"
          name="password"
          placeholder="И пароль"
          type="password"
          @update:model-value="handleUpdatePassword"
        />
        <span v-if="passwordError" :aria-errormessage="passwordError" class="login__error">{{ passwordError }}</span>
      </div>
      <!-- <div
        v-if="hash === '#sign-up'"
        class="login__input-group login__password-group"
      >
        <label for="password"><strong>Подтвердите пароль</strong></label>
        <UIInput
          @update:modelValue="handleUpdatePasswordConfirm"
          class="login__password"
          v-model.trim="passwordConfirm"
          v-model:error="passwordConfirmError"
          type="password"
          id="password"
          placeholder="Повторите пароль"
          name="password"
        />
        <span
          v-if="passwordConfirmError"
          class="login__error"
          :aria-errormessage="passwordConfirmError"
        >{{
          passwordConfirmError }}</span>
      </div> -->
      <UICheckbox v-if="hash === ''" id="'remember'" v-model="rememberMe" name="remember">Запомнить меня</UICheckbox>
      <UIButton type="submit">{{ btnDescr }}</UIButton>
      <p v-if="hash === '#forget'" class="login__no-account">
        Вернуться
        <a class="login__link" href="#">
          <strong>Вход</strong>
        </a>
      </p>
      <!-- <p
        v-if="hash === '#sign-up'"
        class="login__no-account"
      >
        Уже есть аккаунт?
        <a
          class="login__link"
          href="#"
        >
          <strong>Войти</strong>
        </a>
      </p>
      <p
        v-if="hash === ''"
        class="login__no-account"
      >
        Нет аккаунта?
        <a
          class="login__link"
          href="#sign-up"
        >
          <strong>Зарегистрироваться</strong>
        </a>
      </p> -->
    </fieldset>
  </form>
</template>

<style scoped lang="scss">
.login {
  width: 100%;

  &__field {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-inline: 0;
    padding-block: 0;
    padding-inline: 0;
    border: none;
  }

  &__legend {
    margin-bottom: 10px;
    padding-inline: 0;
    width: 100%;
    text-align: start;
  }

  &__input-group {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__password-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }

  &__password {
    grid-area: 2/1/2 / span 2;
  }

  .password {
    &__forget {
      justify-self: end;
      font-size: 0.8em;
    }
  }

  &__no-account {
    text-align: center;
  }

  &__link {
    text-decoration: none;
    color: inherit;
  }

  &__error {
    position: absolute;
    top: 100%;
    color: #ee6666;
    font-size: 0.8em;
  }
}
</style>
