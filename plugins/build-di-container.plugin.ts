import 'reflect-metadata';
import { Context } from '@nuxt/types';
import { container } from 'inversify-props';

import { ICustomerService, CustomerService, ILoadingService, LoadingService } from '../services';

export default () => {
  container.addSingleton<ICustomerService>(CustomerService, 'ICustomerService');
  container.addSingleton<ILoadingService>(LoadingService, 'ILoadingService');
  console.log('DI Initiated');
};
