<template>
  <div class="form-input" :class="{ hasError: v.$error }">
    <label for="re-password">Re-Password <span class="text-error">need same as password</span></label>
    <input v-model="rePassword" type="password" placeholder="Please enter your password ...">
  </div>
</template>
<script>
export default {
  name: 'RePassWordComponent',
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
    rePassword: {
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