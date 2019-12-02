<template>
  <div>{{ message }} for {{ fullName }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Customer } from '../models';

@Component
export default class CustomerComponent extends Vue {
  @Prop({ type: Object, required: true }) readonly customer!: Customer;

  message: string = 'This is a message';

  get fullName(): string {
    if (this.customer) {
      return `${this.customer.firstName} ${this.customer.lastName}`;
    }
    return '';
  }

  // lifecycle hooks
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style scoped>
</style>