import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';

import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../models/agendamento';
import { AgendamentoServiceProvider } from '../../providers/agendamento-service/agendamento-service';

@IonicPage()
@Component({
  selector: 'page-agendamentos-lista',
  templateUrl: 'agendamentos-lista.html',
})
export class AgendamentosListaPage {
  agendamentos: Agendamento[];
  alerta: Alert;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private agendamentoDao: AgendamentoDaoProvider,
    private agendamentoService: AgendamentoServiceProvider) { }

  ionViewDidLoad() {
    this.agendamentoDao.listar()
      .subscribe(resultAgendamentos => this.agendamentos = resultAgendamentos);
  }

  ionViewWillEnter() {
    setTimeout(() => this.atualizarListaConfirmados(), 5000);
  }

  atualizarListaConfirmados() {
    this.agendamentos
      .filter((agendamento: Agendamento) => agendamento.confirmado)
      .forEach((agendamento: Agendamento) => {
        agendamento.visualizado = true;
        this.agendamentoDao.salvar(agendamento);
      })
  }

  reenviar(agendamento: Agendamento) {
    this.alerta = this.alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });

    this.agendamentoService.agendar(agendamento)
      .mergeMap(result => {
        const observableSalvar = this.agendamentoDao.salvar(agendamento);

        if (result instanceof Error)
          throw result;

        return observableSalvar;
      })
      .finally(() => this.alerta.present())
      .subscribe(
        () => {
          this.alerta.setSubTitle('re-agendamento realizado com sucesso');
        },
        (error: Error) => {
          this.alerta.setSubTitle(`erro ao realizar o re-agendamento: ${error.message}`)
        }
      );
  }
}