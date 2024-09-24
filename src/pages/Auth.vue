<script setup lang="ts">
// import AuthForm from "@/components/authorization/AuthForm.vue";
import { token } from "@/api/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const data = ref ({
  login: "1",
  password: "2"
})

const getToken = async (login: string, password: string) => {
  const data = new URLSearchParams({
    username: login,
    password: password
  });
  return await token(data)
}

const handleLogin = async (loginData: any) => {
  // console.log(loginData.login, loginData.password)
  const response = await getToken(loginData.login, loginData.password);

  if (response.success) {
    const token = response.data;
    console.log(token);

    if (token.access_token) {
      localStorage.setItem('authToken', token.access_token);
      router.push({ name: '/' });
    }
  } else {
    console.error('Ошибка авторизации:', response.error);
  }
};

</script>

<template>
  <div class="auth">
    <div class="auth__container">
      <AuthForm v-model:data=data @login-success="handleLogin" />
    </div>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "layout": "auth"
  }
}
</route>

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
