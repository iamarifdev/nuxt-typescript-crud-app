<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field v-model="balance" label="Balance" required></v-text-field>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="add">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import { ICustomer } from '../models';

@Component
export default class CustomerAddComponent extends Vue {
  @Prop({ type: Boolean, required: true }) readonly showDialog!: boolean;

  @Model('change', { type: String }) readonly name!: string;
  @Model('change', { type: String }) readonly email!: string;
  @Model('change', { type: Number }) readonly balance!: number;

  public nameRules = [
    (v: any) => !!v || 'Name is required',
    (v: any) => (v && v.length <= 10) || 'Name must be less than 10 characters'
  ];

  public emailRules = [
    (v: any) => !!v || 'E-mail is required',
    (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
  ];

  @Emit()
  public add(): ICustomer {
    return {
      _id: '7345934759439534',
      name: 'Ariful Islam',
      email: 'abc@gmail.com',
      balance: 1000
    };
  }

  public get dialog(): boolean {
    return this.showDialog;
  }

  mounted() {}
}
</script>

<style scoped></style>
