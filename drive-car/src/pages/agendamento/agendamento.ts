import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Carro } from '../../models/carro';
import { AgendamentoServiceProvider } from '../../providers/agendamento-service/agendamento-service';
import { Agendamento } from '../../models/agendamento';
import { HomePage } from '../home/home';

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
    public alertCtrl: AlertController) {
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
    this.alerta = this.alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'OK',
          handler: () => this.navCtrl.setRoot(HomePage.name)
        }
      ]
    });

    const agendamento: Agendamento = {
      nomeCliente: this.nomeUsuario,
      emailCliente: this.emailUsuario,
      enderecoCliente: this.enderecoUsuario,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal
    };

    this.agendamentoService.agendar(agendamento)
      .subscribe(
        () => {
          this.alertCtrl.setSubTitle('agendamento realizado com sucesso');
        },
        () => this.alertCtrl.setSubTitle('erro ao realizar o agendamento')
      )
      .pipe(finaly(() => this.alertCtrl.present()));
  }
}