<template>
  <form @submit.prevent="sendLoginRequest" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          v-model="email"
          type="email"
          placeholder="demo@email"
          class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button
        type="submit"
        class="button button_primary button_block"
      >
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link :to="{ name: 'register' }" class="link">
        Зарегистрируйтесь
      </router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',
  methods: {
    async sendLoginRequest() {
      if (!this.email) {
        alert('Требуется ввести Email');
        return;
      }
      if (!this.password) {
        alert('Требуется ввести пароль');
        return;
      }
      const user = await login(this.email, this.password);
      if (user.id) {
        alert(user.fullname);
      }else {
        const error = user;
        alert(error.message);
      }
    },
  },

  data() {
    return {
      email: null,
      password: null,
    };
  },
};
</script>

<style scoped></style>
