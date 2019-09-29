import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

import { User } from '../../models/user';

const API_URL = 'http://192.168.188.127:8080/api';
const CHAVE = 'user-avatar';

@Injectable()
export class UserServiceProvider {
  private _usuarioLogado: User;

  constructor(private http: HttpClient, private storage: Storage) { }

  efetuarLogin(email: string, senha: string): Observable<User> {
    return this.http.post<User>(API_URL + '/login', { email, senha })
                      .do(user => this._usuarioLogado = user);
  }

  get usuarioLogado(): User {
    return this._usuarioLogado;
  }

  salvarAvatar(avatar): Observable<any> {
    const promise = this.storage.set(CHAVE, avatar);
    return Observable.fromPromise(promise);
  }

  obterAvatar(): Observable<any> {
    const promise = this.storage.get(CHAVE);
    return Observable.fromPromise(promise);
  }
}
