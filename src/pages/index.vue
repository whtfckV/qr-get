<script setup lang="ts">
  // import { jwtDecode } from '@/utils/jwt_decode'
  import { VDateInput } from 'vuetify/labs/VDateInput'

  const snackbar = ref(true)
  // const a = ref()
  // onMounted(() => {
  // a.value = jwtDecode(localStorage.getItem('authToken'))
  // console.log(a.value)
  // })
  const dates = ref(null)

</script>

<template>

  <!-- <v-alert
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
    title="Alert title"
    type="success"
    closable
  /> -->

  <!-- <div class="d-flex justify-center"> -->
  <v-date-input
    v-model="dates"
    label="Select range"
    max-width="368"
    multiple="range"
  />
  <!-- </div> -->

  <v-snackbar
    v-model="snackbar"
    :absolute="false"
    close-on-content-click
    color="primary"
    :offset="31"
    style="top:0"
    timeout="3000"
  >
    This is a toast notification!
    <!-- <template #actions>
      <v-btn
        color="blue"
        variant="text"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template> -->
  </v-snackbar>

  <!-- <v-date-picker
    multiple="range"
  /> -->
</template>
