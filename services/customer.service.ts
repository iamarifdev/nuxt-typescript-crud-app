import { injectable } from 'inversify-props';
import { map, catchError, first } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { http } from '../helpers';
import { ICustomer, Pagination } from '../models';
import { ICustomerService } from './icustomer.service';

@injectable()
export class CustomerService implements ICustomerService {
  getAllCustomer(params: Pagination): Observable<ICustomer[]> {
    const customers = http.get<ICustomer[]>('/customer/list', { params }).pipe(
      first(),
      map(response => {
        if (response && response.data) {
          return response.data;
        }
        return [];
      }),
      catchError(error => {
        console.log('Customer list error: ', error);
        return of([] as ICustomer[]);
      })
    );
    return customers;
  }

  addNewCustomer(payload: any): Observable<ICustomer> {
    const customer = http.post<ICustomer>('/customer/add', payload).pipe(
      map(response => response && response.data ? response.data : null),
      catchError(error => {
        console.log('Customer add error: ', error);
        return of(null);
      })
    );
    return customer;
  }

  updateCustomer(payload: any, customerId: string): Observable<ICustomer> {
    const customer = http.put<ICustomer>(`/customer/update/${customerId}`, payload).pipe(
      map(response => {
        if (response && response.data) {
          return response.data;
        }
        return null;
      }),
      catchError(error => {
        console.log('Customer update error: ', error);
        return of(null);
      })
    );
    return customer;
  }
}
