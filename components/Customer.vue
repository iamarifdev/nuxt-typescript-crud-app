<template>
  <div>{{ message }} for {{ fullName }}</div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Component, Prop } from 'vue-property-decorator';
import { inject, container } from 'inversify-props';
import { ICustomer } from '../models';
import { ICustomerService, CustomerService } from '../services';

// container.addSingleton<ICustomerService>(CustomerService);


@Component
export default class CustomerComponent extends Vue {
  @inject() private customerService!: ICustomerService;

  @Prop({ type: Object, required: true }) readonly customer!: ICustomer;

  message: string = 'This is a message';

  get fullName(): string {
    if (this.customer) {
      return `${this.customer.firstName} ${this.customer.lastName}`;
    }
    return '';
  }

  // lifecycle hooks
  created() {}
  async mounted() {
    const customers = await this.customerService.getAllCustomer();
    console.log('Mounted with: ', customers);
  }
  updated() {}
  destroyed() {}
}
</script>

<style scoped>
</style>