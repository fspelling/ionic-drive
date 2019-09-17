import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { Agendamento } from '../../models/agendamento';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) { }

  private _gerarChave(agendamento: Agendamento) {
    return agendamento.enderecoCliente + agendamento.data.substr(0, 10);
  }

  salvar(agendamento: Agendamento): Observable<any> {
    const chave = this._gerarChave(agendamento);
    const promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  ehDuplicado(agendamento: Agendamento): Observable<any> {
    const chave = this._gerarChave(agendamento);
    const promise = this._storage.get(chave).then(response => response ? true : false);

    return Observable.fromPromise(promise);
  }

  listar(): Observable<Agendamento[]> {
    const agendamentoLista: Agendamento[] = [];

    const promise = this._storage.forEach((agendamento: Agendamento) => {
      agendamentoLista.push(agendamento);
    }).then(() => agendamentoLista);

    return Observable.fromPromise(promise);
  }
}