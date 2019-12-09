import { injectable } from 'inversify-props';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { ICustomer } from '../models';
import { http } from '../helpers';

export interface ICustomerService {
  getAllCustomer(): Observable<ICustomer[]>;
  addNewCustomer(payload: any): Observable<ICustomer | null>;
}

@injectable()
export class CustomerService {
  getAllCustomer(): Observable<ICustomer[]> {
    const customers = http.get<ICustomer[]>('/customer/list').pipe(
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
}
