import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';

const API_URL = 'http://192.168.188.127:8080/api';

@Injectable()
export class UserServiceProvider {
  private _usuarioLogado: User;

  constructor(private http: HttpClient) { }

  efetuarLogin(email: string, senha: string): Observable<User> {
    return this.http.post<User>(API_URL + '/login', { email, senha })
                      .do(user => this._usuarioLogado = user);
  }

  get usuarioLogado(): User {
    return this._usuarioLogado;
  }
}
