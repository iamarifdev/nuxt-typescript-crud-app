import { Observable } from 'rxjs';

export interface ILoadingService {
  start(): void;
  finish(): void;
  abort(): void;
  isLoading: boolean;
  $isLoading: Observable<boolean>;
  isAborted: boolean;
}
