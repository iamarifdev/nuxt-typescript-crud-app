import { Observable } from 'rxjs';
import { ICustomer, Pagination, IPaginatedList } from '../models';

export interface ICustomerService {
  getPaginatedCustomer(params: Pagination): Observable<IPaginatedList<ICustomer>>;
  addNewCustomer(payload: any): Observable<ICustomer | null>;
  updateCustomer(payload: any, customerId: string): Observable<ICustomer | null>;
}
