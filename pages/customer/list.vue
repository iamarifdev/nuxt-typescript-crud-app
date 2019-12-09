<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { inject } from 'inversify-props';

import CustomerList from '~/components/CustomerList.vue';
import CustomerAdd from '~/components/CustomerAdd.vue';
import CustomerEdit from '~/components/CustomerEdit.vue';

import { ICustomerService } from '../../services';
import { ICustomer } from '../../models';

@Component({
  components: {
    CustomerList,
    CustomerAdd,
    CustomerEdit
  }
})
export default class Home extends Vue {
  @inject() private customerService!: ICustomerService;

  public customers: ICustomer[] = [];
  public addDialog: boolean = false;
  public editDialog: boolean = false;
  public editCustomer: ICustomer = {
    _id: '',
    name: '',
    balance: 0,
    email: ''
  };

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

  public onCustomerUpdated(customer: any): void {
    this.closeModal();
    // todo
  }

  public closeModal(): void {
    this.addDialog = false;
    this.editDialog = false;
  }

  public showCustomerEditDialog(customer: ICustomer): void {
    console.log('customer page selected: ', customer);
    this.editDialog = true;
    this.editCustomer = customer;
  }
}
</script>

<style scoped></style>

<template>
  <v-card outlined>
    <v-card-title>Customer List</v-card-title>
    <v-card-subtitle>Customer</v-card-subtitle>
    <v-divider :inset="false"></v-divider>
    <customer-list :customers="customers" @editCustomer="showCustomerEditDialog"></customer-list>
    <v-card-text>
      <v-btn fixed dark fab bottom right color="green darken-1" @click="addDialog = !addDialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
    <customer-add :showDialog="addDialog" @add="onCustomerAdded" @close="closeModal"></customer-add>
    <customer-edit
      v-if="editDialog"
      :customer="editCustomer"
      :showDialog="editDialog"
      @update="onCustomerAdded"
      @close="closeModal"
    ></customer-edit>
  </v-card>
</template>
