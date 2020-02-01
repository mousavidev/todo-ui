import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';

import { Todo } from './todo.model';
import { TODO_API_URL } from './todo.token';

@Injectable()
export class TodoService {

  constructor(
    @Inject(TODO_API_URL) private apiUrl: string,
    private http: HttpClient
  ) { }

  public getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todo`);
  }

  public get(todoId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/todo/${todoId}`);
  }

  public add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todo`, todo);
  }

  public edit(todo: Todo): Observable<any> {
    return this.http.put(`${this.apiUrl}/todo/${todo.id}`, todo);
  }

  public changeTitle(todoId: number, todo: Todo): Observable<any> {
    return this.http.patch(`${this.apiUrl}/todo/${todoId}`, todo);
  }

  public done(todoId: number, todo: Todo): Observable<any> {
    return this.http.patch(`${this.apiUrl}/todo/${todoId}`, todo);
  }

  public delete(todoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todo/${todoId}`);
  }
}
