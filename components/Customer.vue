<template>
  <v-list-item @click="editCustomer">
    <v-list-item-avatar>
      <v-img :src="customer.avatar || '/avatar.png'"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="customer.name"></v-list-item-title>
      <v-list-item-subtitle v-text="customer.balance"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click="removeCustomer">
        <v-icon color="grey lighten-1">mdi-file-remove</v-icon>
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
    return this.customer;
  }

  @Emit('removeCustomer')
  public removeCustomer(): ICustomer {
    console.log('remove', this.customer);
    return this.customer;
  }
}
</script>

<style scoped>
</style>
