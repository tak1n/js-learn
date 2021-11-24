import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable()
export class TodoListService {
  private resourceUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  create(todo: Todo): Observable<Todo> {
    const copy = this.convert(todo);

    return this.http.post<Todo>(this.resourceUrl, copy);
  }

  update(todo: Todo): Observable<Todo> {
    const copy = this.convert(todo);

    return this.http.put<Todo>(`${this.resourceUrl}/${copy.id}`, copy);
  }

  find(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.resourceUrl}/${id}`);
  }

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.resourceUrl}`);
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`);
  }

  private convert(todo: Todo) {
    const copy: Todo = Object.assign({}, todo);
    return copy;
  }
}
