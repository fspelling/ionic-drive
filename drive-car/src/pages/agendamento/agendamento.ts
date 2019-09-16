import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

import { Carro } from '../../models/carro';
import { AgendamentoServiceProvider } from '../../providers/agendamento-service/agendamento-service';
import { Agendamento } from '../../models/agendamento';
import { HomePage } from '../home/home';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';

@IonicPage()
@Component({
  selector: 'page-agendamento',
  templateUrl: 'agendamento.html',
})
export class AgendamentoPage {
  carro: Carro;
  precoTotal: number;
  nomeUsuario: string;
  enderecoUsuario: string;
  emailUsuario: string;
  dataUsuario: string;
  alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public agendamentoService: AgendamentoServiceProvider,
    public alertCtrl: AlertController,
    public agendamentoDao: AgendamentoDaoProvider) {
  }

  ionViewDidLoad() {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.navParams.get('precoTotal');

    this.nomeUsuario = '';
    this.enderecoUsuario = '';
    this.emailUsuario = '';
    this.dataUsuario = new Date().toISOString();
  }

  agendar() {
    if (!this.nomeUsuario || !this.enderecoUsuario || !this.dataUsuario) {
      this.alertCtrl.create({
        title: 'Aviso',
        subTitle: 'Preencher os campos obrigatorios',
        buttons: [{ text: 'OK' }]
      }).present();
      return;
    }

    this.alerta = this.alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'OK',
          handler: () => { this.navCtrl.setRoot(HomePage) }
        }
      ]
    });

    const agendamento: Agendamento = {
      nomeCliente: this.nomeUsuario,
      emailCliente: this.emailUsuario,
      enderecoCliente: this.enderecoUsuario,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      data: this.dataUsuario,
      enviado: false,
      confirmado: false
    };

    this.agendamentoDao.ehDuplicado(agendamento)
      .mergeMap(result => {
        if (result)
          throw new Error('agendamento duplicado');

        return this.agendamentoService.agendar(agendamento);
      })
      .mergeMap(result => {
        const observableSalvar = this.agendamentoDao.salvar(agendamento);

        if (result instanceof Error)
          throw result;

        return observableSalvar;
      })
      .finally(() => this.alerta.present())
      .subscribe(
        () => {
          this.alerta.setSubTitle('agendamento realizado com sucesso');
        },
        (error: Error) => {
          this.alerta.setSubTitle(`erro ao realizar o agendamento: ${error.message}`)
        }
      );
  }
}
