<script lang="ts">
import 'reflect-metadata';
import { Vue, Component, Prop } from 'vue-property-decorator';
import CustomerList from '~/components/CustomerList.vue';
import CustomerAdd from '~/components/CustomerAdd.vue';

import { inject, container } from 'inversify-props';
import { ICustomerService, CustomerService } from '../../services';
import { ICustomer } from '../../models';

@Component({
  components: {
    CustomerList,
    CustomerAdd
  }
})
export default class Home extends Vue {
  @inject() private customerService!: ICustomerService;

  public dialog: boolean = false;
  public customers: ICustomer[] = [];

  mounted() {
    this.customerService.getAllCustomer().subscribe((customers: ICustomer[]) => {
      this.customers = customers;
    });
  }

  public onCustomerAdded(customer: ICustomer): void {
    this.dialog = false;
    console.log('customer', customer);
  }
}
</script>

<style scoped>
</style>

<template>
  <v-card>
    <customer-list :customers="customers"></customer-list>
    <v-card-text>
      <v-btn fixed dark fab bottom right color="primary" @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
    <customer-add :showDialog="dialog" @add="onCustomerAdded"></customer-add>
  </v-card>
</template>
