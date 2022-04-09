<template>
  <div class="form-input" :class="{ hasError: v.$error }">
    <label for="password">Password <span class="text-error">must not be less than 5 characters</span></label>
    <input v-model="password" type="password" placeholder="Please enter your password ...">
  </div>
</template>
<script>
export default {
  name: 'PasswordComponent',
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
    password: {
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