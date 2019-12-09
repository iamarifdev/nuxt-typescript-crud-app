<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="customer.avatar || '/avatar.png'"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="customer.name"></v-list-item-title>
      <v-list-item-subtitle v-text="customer.balance"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click="editCustomer">
        <v-icon color="grey lighten-1">mdi-file-edit</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { ICustomer } from '../models';

@Component
export default class CustomerComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly customer!: ICustomer;

  @Emit('editCustomer')
  public editCustomer(): ICustomer {
    console.log('customer component: ', this.customer);
    return this.customer;
  }
}
</script>

<style scoped>
</style>
