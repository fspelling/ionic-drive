import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Carro } from '../../models/carro';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    console.log('agendando');
  }
}