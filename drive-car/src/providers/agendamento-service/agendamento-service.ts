import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Agendamento } from '../../models/agendamento';

const API_URL = 'http://localhost:8080/api';

@Injectable()
export class AgendamentoServiceProvider {
    constructor(private http: HttpClient) { }

    agendar(agendamento: Agendamento): Observable<any> {
        return this.http.post(API_URL + '/agendamento/agenda', agendamento);
    }
}