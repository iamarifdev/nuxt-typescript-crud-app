import { Observable } from 'rxjs';
import { ICustomer, Pagination } from '../models';

export interface ICustomerService {
  getAllCustomer(params: Pagination): Observable<ICustomer[]>;
  addNewCustomer(payload: any): Observable<ICustomer | null>;
  updateCustomer(payload: any, customerId: string): Observable<ICustomer | null>;
}
