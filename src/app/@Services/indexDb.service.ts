import {Injectable} from '@angular/core';
import {BehaviorSubject, concat, forkJoin, Observable} from 'rxjs';
import {ServiceWorkerService} from './service-worker.service';
import {filter, mergeMap} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';

export interface Operation {
  method: string;
  url: string;
  body?: any;
  id: number;
}

@Injectable()
export class IndexDbService {
  dbReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  db: any;

  constructor(private serviceWorkerService: ServiceWorkerService, private httpClient: HttpClient) {
    this.init();
    this.waitForUpdate();
  }

  private init() {
    const request = window.indexedDB.open('op', 203);
    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.dbReady$.next(true);
    };
    request.onerror = (err) => {
      console.error(err);
    };
    request.onupgradeneeded = (event: any) => {
      this.db = event.target.result;
      const collectionExist = Object.keys(this.db.objectStoreNames).find((key) => this.db.objectStoreNames[key] === 'operations');
      if (collectionExist) {
        return;
      }
      this.db.createObjectStore('operations', {
        keyPath: 'id',
        autoIncrement: true,
      });
    };
  }

  insertOperation(method: string, url: string, body: any) {
    const transaction = this.db.transaction('operations', 'readwrite').objectStore('operations');
    transaction.add({method, url, body});
  }

  getOperations() {
    return new Observable<Operation[]>((observer) => {
      const transaction = this.db.transaction('operations', 'readwrite').objectStore('operations');
      const request = transaction.getAll();
      request.onsuccess = (event) => {
        observer.next(event.target.result);
        observer.complete();
      };
    });
  }

  deleteOperation(op: Operation) {
    return new Observable(observer => {
      const transaction = this.db.transaction('operations', 'readwrite').objectStore('operations').delete(op.id);
      transaction.onsuccess = (event) => {
        observer.complete();
      };
      transaction.onerror = (event) => {
        console.error(event);
      }
    });
  }

  private waitForUpdate() {
    this.dbReady$.pipe(filter((r) => r), mergeMap(() => {
      return this.serviceWorkerService.offline$.pipe(filter((o) => !o));
    })).subscribe(() => {
      this.replayRequests().subscribe(() => {
        console.log('[PWA] request replayed');
      });
    });
  }

  private replayRequests(): Observable<any> {
    return this.getOperations().pipe(mergeMap((operations: Operation[]) => {
      const operations$ = [];
      for (const operation of operations) {
        const r = new HttpRequest(operation.method, operation.url, operation.body);
        operations$.push(this.httpClient.request(r));
        this.deleteOperation(operation).subscribe();
      }
      return concat(operations$);
    }));
  }
}
