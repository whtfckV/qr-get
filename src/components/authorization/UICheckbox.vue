<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const model = defineModel();
</script>

<template>
  <label class="checkbox">
    <input
      class="checkbox__input"
      v-model="model"
      v-bind="$attrs"
      type="checkbox"
    >
    <span class="checkbox__custom"></span>
    <slot />
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  position: relative;
  display: flex;
  align-self: flex-start;
  gap: 5px;
  padding-left: 1.2em;

  &__input {
    position: absolute;
    appearance: none;

    &:checked {
      &+.checkbox__custom {
        background-color: #4245ba;
      }
    }

    &:disabled {
      &+.checkbox__custom {
        filter: grayscale(1);
      }

    }

    &:focus {
      outline: none;

      &+.checkbox__custom {
        outline: 1px solid lighten(#4245ba, 20);
      }
    }

  }

  &__custom {
    position: absolute;
    left: 0;
    top: 50%;
    display: block;
    border: 2px solid #4245ba;
    border-radius: 3px;
    height: 1em;
    background-color: #fff;
    aspect-ratio: 1;
    translate: 0 -50%;
    transition: background-color .3s cubic-bezier(0.075, 0.82, 0.165, 1);

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      width: 9px;
      height: 5px;
      border-top: 2px solid #fff;
      border-right: 2px solid #fff;
      rotate: 140deg;
      translate: -50% -70%;
    }
  }
}
</style>