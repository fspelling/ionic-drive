import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Carro } from '../../models/carro';

@Component({
  selector: 'page-acessorios',
  templateUrl: 'acessorios.html'
})
export class AcessoriosPage {
  carro: Carro;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) { }

  ionViewDidLoad() {
    this.carro = this.navParams.get('carroSelecionado');
  }
}
