<script setup lang="ts">
// import AuthForm from "@/components/authorization/AuthForm.vue";
import { token } from "@/api/auth";
// import { useRouter } from "vue-router";

// const router = useRouter();



const getToken = async () => {
  const data = new URLSearchParams({
    username: 'admin',
    password:'oih9RaesoZoi2oc'
  });
  await token(data)
}

const handleLogin = () => {
  const token = getToken()
  console.log(token)
  // localStorage.setItem('authToken', token)
  // if (token) {
  //   router.push({ name: '/' });
  // }
};
</script>

<template>
  <div class="auth">
    <div class="auth__container">
      <AuthForm @login-success="handleLogin" />
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
