<script lang="ts">
import { Vue, Component, Prop, Ref, Model } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { inject } from 'inversify-props';

import { Authentication } from '~/store/modules';
import { ILoadingService } from '../../services';

@Component({
  layout: 'auth'
})
export default class LoginPage extends Vue {
  @inject('ILoadingService') private loadingService!: ILoadingService;
  @Ref('form') readonly form!: HTMLFormElement;

  public authModule: Authentication;
  public isLoading: boolean = false;
  public login = {
    email: '',
    password: ''
  };
  public isFormValid: boolean = false;
  public rules = {
    email: [(v: any) => !!v || 'E-mail is required', (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
    password: [(v: any) => !!v || 'Password is required']
  };

  public created(): void {
    this.authModule = getModule(Authentication, this.$store);
  }

  public mounted(): void {
    this.loadingService.$isLoading.subscribe(loading => (this.isLoading = loading));
    console.log('store', this.$store.state);
  }

  public authenticate(event: any) {
    const form = this.$refs.form as any;
    if (form.validate()) {
      this.authModule.login({
        email: this.login.email,
        token: 'login user token need to be generated'
      });
      this.$router.push({ path: '/customer/list' });
    }
  }

  // public destroyed() {
  //   this.loadingService && this.loadingService.finish();
  // }
}
</script>

<style scoped></style>

<template>
  <v-form ref="form" v-model="isFormValid" lazy-validation @submit.prevent="authenticate($event)">
    <v-card :loading="isLoading" width="300">
      <v-card-title>Authentication</v-card-title>
      <v-card-subtitle>Enter your valid credentials</v-card-subtitle>
      <v-divider :inset="false"></v-divider>
      <v-container>
        <v-text-field
          dense
          outlined
          v-model="login.email"
          :rules="rules.email"
          label="E-mail"
          placeholder="E-mail"
          required
        ></v-text-field>
        <v-text-field
          dense
          outlined
          v-model="login.password"
          :rules="rules.password"
          label="Password"
          placeholder="Password"
          required
        >
        </v-text-field>
        <v-btn block type="submit" color="success" :disabled="!isFormValid || isLoading">
          Login
        </v-btn>
      </v-container>
    </v-card>
  </v-form>
</template>
