import { Observable } from 'rxjs';
import { ICustomer } from '../models';

export interface ICustomerService {
  getAllCustomer(): Observable<ICustomer[]>;
  addNewCustomer(payload: any): Observable<ICustomer | null>;
  updateCustomer(payload: any, customerId: string): Observable<ICustomer | null>;
}
