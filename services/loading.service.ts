import { injectable } from 'inversify-props';
import { Observable, BehaviorSubject } from 'rxjs';
import { ILoadingService } from './iloading.service';

@injectable()
export class LoadingService implements ILoadingService {
  public loadingSubject: BehaviorSubject<boolean>;
  public isLoading: boolean;
  public isAborted: boolean;
  public $isLoading: Observable<boolean>;

  constructor() {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading = false;
    this.isAborted = false;
    this.$isLoading = this.loadingSubject.asObservable();
    this.$isLoading.subscribe(value => {
      this.isLoading = value;
    });
  }

  start(): void {
    this.loadingSubject.next(true);
    this.isAborted = false;
  }
  finish(): void {
    this.loadingSubject.next(false);
    this.isAborted = false;
  }
  abort(): void {
    this.loadingSubject.next(false);
    this.isAborted = true;
  }
}
