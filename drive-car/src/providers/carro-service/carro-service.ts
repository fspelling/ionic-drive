import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Carro } from '../../models/carro';

const API_URL = 'http://localhost:8080/api';

@Injectable()
export class CarroServiceProvider {
  constructor(private http: HttpClient) { }

  listar(): Observable<Carro[]> {
    return this.http.get<Carro[]>(API_URL + '/carro/listaTodos');
  }
}
