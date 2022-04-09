<template>
    <div class="section-login">
    <h1 class="section-title">Sign up</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-login">
        <email-form v-model="form.email" :v="$v.form.email" />
        <password-form v-model="form.password" :v="$v.form.password" />
        <re-password-form v-model="form.rePassword" :v="$v.form.rePassword" />
        <div class="form-submit">
          <button type="submit">Sign up</button>
        </div>
      </div>
    </form>
    <div class="block-signup">
      <span>If you had</span>
      <nuxt-link to="/login">Sign in</nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { required, email, sameAs } from "vuelidate/lib/validators"
import { isPasswordAvailable } from '../../utils/validators'
import EmailForm from '../../components/Form/EmailForm.vue'
import PasswordForm from '../../components/Form/PasswordForm.vue'
import RePasswordForm from '../../components/Form/RePasswordForm.vue'

export default {
  components: { EmailForm, PasswordForm, RePasswordForm },
  name: 'RegisterPage',
  layout: 'auth',
  data() {
    return {
      form: {
        email: '',
        password: '',
        rePassword: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, isPasswordAvailable },
      rePassword: { required, sameAsPassword: sameAs("password") }
    }
  },
  methods: {
    ...mapActions(['register']),
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$pending || this.$v.form.$error) return;
      this.register(this.form);
    }
  }
}
</script>
<style scoped src="@/assets/css/auth.css"/>