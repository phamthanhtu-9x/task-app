<template>
  <div class="section-login">
    <h1 class="section-title">Sign in</h1>
    <form @submit.prevent="onSubmit" novalidate>
      <div class="form-login">
        <email-form v-model="form.email" :v="$v.form.email" />
        <password-form v-model="form.password" :v="$v.form.password" />
        <div class="form-submit">
          <button type="submit">Sign in</button>
        </div>
      </div>
    </form>
    <div class="block-signup">
      <span>New accout ?</span>
      <nuxt-link to="/register">Create an account</nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { required, email } from "vuelidate/lib/validators"
import { isPasswordAvailable } from '../../utils/validators'
import EmailForm from '../../components/Form/EmailForm.vue'
import PasswordForm from '../../components/Form/PasswordForm.vue'

export default {
  components: { EmailForm, PasswordForm },
  name: 'LoginPage',
  layout: 'auth',
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, isPasswordAvailable },
    }
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$pending || this.$v.form.$error) return;
      this.login(this.form);
    }
  }
}
</script>
<style scoped src="@/assets/css/auth.css"/>