<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { inject } from 'inversify-props';

import CustomerList from '~/components/CustomerList.vue';
import CustomerAdd from '~/components/CustomerAdd.vue';

import { ICustomerService } from '../../services';
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

  public onCustomerAdded(customer: any): void {
    this.closeModal();
    if (customer) {
      this.customerService.addNewCustomer(customer).subscribe(savedCustomer => {
        if (savedCustomer) {
          this.customers.unshift(savedCustomer);
        }
      });
    }
  }

  public closeModal(): void {
    this.dialog = false;
  }
}
</script>

<style scoped>
</style>

<template>
  <v-card outlined>
    <v-card-title>Customer List</v-card-title>
    <v-card-subtitle>Customer</v-card-subtitle>
    <!-- <v-divider vertical class="mx-4" :inset="false"></v-divider> -->
    <customer-list :customers="customers"></customer-list>
    <v-card-text>
      <v-btn fixed dark fab bottom right color="primary" @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
    <customer-add :showDialog="dialog" @add="onCustomerAdded" @close="closeModal"></customer-add>
  </v-card>
</template>
