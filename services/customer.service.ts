import { injectable } from 'inversify-props';
import { ICustomer } from '../models';

export interface ICustomerService {
  getAllCustomer(): Promise<ICustomer[]>;
}

@injectable()
export class CustomerService implements ICustomerService {
  async getAllCustomer(): Promise<ICustomer[]> {
    // todo need call API
    return Promise.resolve([]);
  }
}
