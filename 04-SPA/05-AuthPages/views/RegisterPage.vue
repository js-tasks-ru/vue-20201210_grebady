<template>
  <form @submit.prevent="sendRequestToReg" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="fullName" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="repeatPassword" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input v-model="isAgreeWithConditions" type="checkbox" /> Я согласен с
        условиями <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button
        type="submit"
        class="button button_primary"
      >
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link :to="{ name: 'login' }">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',
  methods: {
    async sendRequestToReg() {
      if (!this.isValidate()) return;

      const newUser = await register(this.email, this.fullName, this.password);
      if (newUser.id) {
        alert(newUser.id);
      } else {
        const error = newUser;
        alert(error.message);
      }
    },

    isValidate() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return false;
      }
      if (!this.fullName) {
        alert('Требуется ввести полное имя');
        return false;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return false;
      }
      if (!this.isPasswordsEqual) {
        alert('Пароли не совпадают');
        return false;
      }
      if (!this.isAgreeWithConditions) {
        alert('Требуется согласиться с условиями');
        return false;
      }
      return true;
    },
  },

  data() {
    return {
      email: null,
      fullName: null,
      password: null,
      repeatPassword: null,
      isAgreeWithConditions: null,
    };
  },
  computed: {
    isPasswordsEqual() {
      return this.password === this.repeatPassword;
    },
  },
};
</script>

<style scoped></style>
