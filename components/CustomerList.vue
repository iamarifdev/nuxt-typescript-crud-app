<template>
  <v-list two-line subheader>
    <customer v-for="customer in customers" :key="customer._id" :customer="customer"></customer>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Customer from '~/components/Customer.vue';
import { ICustomer } from '../models';

@Component({
  components: {
    Customer
  }
})
export default class CustomerListComponent extends Vue {
  @Prop({ type: Array, required: true }) readonly customers!: ICustomer[];
}
</script>

<style scoped></style>
