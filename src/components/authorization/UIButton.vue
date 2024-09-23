<template>
  <button
    class="btn"
    type="submit"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  padding: 8px;
  border: none;
  border-radius: 3px;
  background-color: #4245ba;
  color: #fff;
  font-size: 16px;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-duration: .3s;
  transition-property: background-color;

  &:hover {
    background-color: darken(#4245ba, 4);
  }

  &:focus {
    outline: 1px solid lighten(#4245ba, 20);
  }
}
</style>
