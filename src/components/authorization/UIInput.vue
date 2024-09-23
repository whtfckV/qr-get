<script setup lang="ts">
const model = defineModel();
const error = defineModel<string>('error')

</script>

<template>
  <input
    :aria-invalid="error?.length !== 0"
    v-model="model"
    class="ui-input"
  >
</template>

<style scoped lang="scss">
.ui-input {
  padding: 2px 5px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  width: 100%;
  background-color: #fff;
  line-height: 2;
  font-size: 14px;
  outline: none;
  transition-duration: .3s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-property: border-color;

  &:hover,
  &:focus {
    outline: none;
    border-color: #4245ba;
  }

  &[aria-invalid='true'] {
    border-color: #ee6666;
    animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
  }
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>