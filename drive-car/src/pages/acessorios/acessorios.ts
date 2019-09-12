import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { Carro } from '../../models/carro';
import { Acessorio } from '../../models/acessorio';
import { AgendamentoPage } from '../agendamento/agendamento';

@IonicPage()
@Component({
  selector: 'page-acessorios',
  templateUrl: 'acessorios.html'
})
export class AcessoriosPage {
  carro: Carro;
  acessorios: Acessorio[];
  total: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    this.acessorios = [
      { nome: 'Ar condicionado', preco: 1000 },
      { nome: 'Volante', preco: 400 },
      { nome: 'Espelho', preco: 200 }
    ];

    this.carro = this.navParams.get('carroSelecionado');
    this.total = this.carro.preco;
  }

  atualizarTotal(selecionado: boolean, acessorio: Acessorio) {
    selecionado ? this.total += acessorio.preco : this.total -= acessorio.preco;
  }

  avancar() {
    this.navCtrl.push(AgendamentoPage.name, { carroSelecionado: this.carro, precoTotal: this.total });
  }
}