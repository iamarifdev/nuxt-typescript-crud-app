<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { inject } from 'inversify-props';

import CustomerList from '~/components/CustomerList.vue';
import CustomerAdd from '~/components/CustomerAdd.vue';
import CustomerEdit from '~/components/CustomerEdit.vue';

import { ICustomerService, ILoadingService } from '../../services';
import { ICustomer } from '../../models';

@Component({
  components: {
    CustomerList,
    CustomerAdd,
    CustomerEdit
  }
})
export default class Home extends Vue {
  @inject('ILoadingService') private asyncService!: ILoadingService;
  @inject('ICustomerService') private customerService!: ICustomerService;

  public isLoading: boolean = false;
  public customers: ICustomer[] = [];
  public addDialog: boolean = false;
  public editDialog: boolean = false;
  public editCustomer: ICustomer = {
    _id: '',
    name: '',
    balance: 0,
    email: ''
  };

  public mounted(): void {
    this.asyncService.$isLoading.subscribe(loading => (this.isLoading = loading));
    this.asyncService.start();
    this.customerService.getAllCustomer().subscribe((customers: ICustomer[]) => {
      this.asyncService.finish();
      console.log(this.isLoading);
      this.customers = customers;
    });
  }

  public onCustomerAdded(customer: any): void {
    if (customer) {
      this.asyncService.start();
      this.customerService.addNewCustomer(customer).subscribe(savedCustomer => {
        this.asyncService.finish();
        if (savedCustomer) {
          this.customers.unshift(savedCustomer);
        }
        this.closeModal();
      });
    }
  }

  public onCustomerUpdated(customer: ICustomer): void {
    if (customer && customer._id) {
      this.asyncService.start();
      const { _id, ...payload } = customer;
      this.customerService.updateCustomer(payload, _id).subscribe(updatedCustomer => {
        this.asyncService.finish();
        this.customers = this.customers.map(item => {
          if (updatedCustomer && item._id === updatedCustomer._id) {
            item = updatedCustomer;
          }
          return item;
        });
        this.closeModal();
      });
    }
  }

  public closeModal(): void {
    this.addDialog = false;
    this.editDialog = false;
  }

  public showCustomerEditDialog(customer: ICustomer): void {
    this.editDialog = true;
    this.editCustomer = customer;
  }

  public destroyed(): void {
    this.asyncService && this.asyncService.finish();
  }
}
</script>

<style scoped></style>

<template>
  <v-card outlined>
    <v-card-title>Customer List</v-card-title>
    <v-card-subtitle>Customer</v-card-subtitle>
    <v-divider :inset="false"></v-divider>
    <v-skeleton-loader v-if="isLoading" :transition="'scale-transition'" type="list-item-avatar-two-line">
    </v-skeleton-loader>
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
      @update="onCustomerUpdated"
      @close="closeModal"
    ></customer-edit>
  </v-card>
</template>
