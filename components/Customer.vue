<template>
  <v-list-item @click="handleCustomerClick">
    <v-list-item-avatar>
      <v-img :src="customer.avatar || '/avatar.png'"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="customer.name"></v-list-item-title>
      <v-list-item-subtitle v-text="customer.balance"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <v-icon color="grey lighten-1">mdi-information</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ICustomer } from '../models';

@Component
export default class CustomerComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly customer!: ICustomer;

  public handleCustomerClick(): void {
    console.log('Clicked');
  }
}
</script>

<style scoped>
</style>
