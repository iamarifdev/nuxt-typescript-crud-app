<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Customer from '~/components/Customer.vue';

import { ICustomer } from '../../models';

@Component({
  components: { Customer }
})
export default class Home extends Vue {
  customers: ICustomer[] = [
    { firstName: 'Md. Ariful', lastName: 'Islam' },
    { firstName: 'Shariful', lastName: 'Islam' },
    { firstName: 'Saiful', lastName: 'Islam' },
    { firstName: 'Abu Bakkar', lastName: 'Siddique' }
  ];
}
</script>

<style scoped>
</style>

<template>
  <div>
    <customer v-for="(item, index) in customers" :customer="item" :key="index"></customer>
  </div>
</template>