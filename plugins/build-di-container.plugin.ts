import 'reflect-metadata';
import { container } from 'inversify-props';

import { ICustomerService, CustomerService } from '../services';

export default () => {
  container.addSingleton<ICustomerService>(CustomerService);
  console.log('Module Initiated');
};
