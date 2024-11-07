<script setup lang="ts">
import { token } from '@/api/auth'
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const getToken = async (login: string, password: string) => {
  const data = new URLSearchParams({
    username: login,
    password,
  })
  return token(data)
}

const handleLogin = async (loginData: any) => {
  const response = await getToken(loginData.login, loginData.password)

  if (response.success) {
    const token = response.data

    if (token.access_token) {
      localStorage.setItem('authToken', token.access_token)
      userStore.getUserInfo()

      if (userStore.user?.role === 'admin') {
        router.push({ name: '/admin/Users' })
      } else {
        userStore.getSettings()
        const settings = userStore.settings;
        if (settings) {
          if (settings.report_sales_returns) {
            router.push({ name: '/reports/SellersReturn' })
          } else if (settings.report_disput) {
            router.push({ name: '/reports/Disput' })
          } else if (settings.report_profit) {
            router.push({ name: '/reports/Profit' })
          } else {
            alert('Нет доступных отчетов')
          }
        }
      }
    }
  } else {
    console.error('Ошибка авторизации:', response.error)
  }
}

</script>

<template>
  <div class="auth">
    <div class="auth__container">
      <AuthForm @login-success="handleLogin" />
    </div>
  </div>
</template>

<route lang="json">{
  "meta": {
    "layout": "auth"
  }
}</route>

<style scoped lang="scss">
.auth {
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-image: url("@/assets/bg.jpg");
  display: flex;
  justify-content: end;

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    height: 100%;
    background-color: #fff;
    backdrop-filter: blur(5px);

    padding: 50px;

    @media screen and (max-width: 991px) {
      max-width: none;
    }
  }
}
</style>
