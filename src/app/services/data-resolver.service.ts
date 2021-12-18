import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

interface Data {
  id: number;
  name: string;
  status: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<Data> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Data> | Promise<Data> | Data {
    const id: number = +route.params['id'];

    return {id: id, name: 'test', status: 'status'};
  }
}
