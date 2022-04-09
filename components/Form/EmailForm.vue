<template>
  <div class="form-input" :class="{ hasError: v.$error }">
    <label for="email">Email <span class="text-error">must not be less than 5 characters</span></label>
    <input v-model="email" type="email" placeholder="Please enter your emaill ...">
  </div>
</template>
<script>
export default {
  name: 'EmaillComponent',
  props: {
    value: {
      type: String,
      default: ""
    },
    v: {
      type: Object,
      required: true
    }
  },
  computed: {
    email: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit("input", value);
      }
    }
  }
}
</script>