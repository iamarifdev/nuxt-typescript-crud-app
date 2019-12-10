import { injectable } from 'inversify-props';
import { map, catchError, delay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { ICustomer } from '../models';
import { http } from '../helpers';
import { ICustomerService } from './icustomer.service';

@injectable()
export class CustomerService implements ICustomerService {
  getAllCustomer(): Observable<ICustomer[]> {
    const customers = http.get<ICustomer[]>('/customer/list').pipe(
      delay(100),
      map(response => {
        if (response && response.data) return response.data;
        return [];
      }),
      catchError(error => {
        console.log('Customer list error: ', error);
        return of([] as ICustomer[]);
      })
    );
    return customers;
  }

  addNewCustomer(payload: any): Observable<ICustomer | null> {
    const customer = http.post<ICustomer>('/customer/add', payload).pipe(
      map(response => {
        if (response && response.data) return response.data;
        return null;
      }),
      catchError(error => {
        console.log('Customer add error: ', error);
        return of(null);
      })
    );
    return customer;
  }

  updateCustomer(payload: any, customerId: string): Observable<ICustomer | null> {
    const customer = http.put<ICustomer>(`/customer/update/${customerId}`, payload).pipe(
      map(response => {
        if (response && response.data) return response.data;
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
