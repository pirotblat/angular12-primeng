import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<[{ [s: string]: any; }]> {
    return this.http.get<[{ [s: string]: any; }]>('https://jsonplaceholder.typicode.com/posts');
  }
  getPost(id: any): Observable<Object> {
    return this.http.get<Object>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
