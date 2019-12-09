<template>
  <v-list two-line subheader>
    <customer
      v-for="customer in customers"
      :key="customer._id"
      :customer="customer"
      @editCustomer="editCustomer"
    ></customer>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import Customer from '~/components/Customer.vue';
import { ICustomer } from '../models';

@Component({
  components: {
    Customer
  }
})
export default class CustomerListComponent extends Vue {
  @Prop({ type: Array, required: true }) readonly customers!: ICustomer[];

  @Emit('editCustomer')
  public editCustomer(customer: ICustomer): ICustomer {
    console.log('customer list selected: ', customer);
    return customer;
  }
}
</script>

<style scoped></style>
