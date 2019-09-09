import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { CarroServiceProvider } from '../../providers/carro-service/carro-service';
import { Carro } from '../../models/carro';
import { NavLifeCircle } from '../../utils/ionic/nav/nav-lifeCircle';
import { AcessoriosPage } from '../acessorios/acessorios';

@Component({
  templateUrl: 'home.html'
})
export class HomePage implements NavLifeCircle {
  public listaCarros: Carro[];

  constructor(
    private navCtrl: NavController,
    private carroProvider: CarroServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    const loading = this.loadingCtrl.create({
      content: 'Carregando carros...'
    });

    loading.present();

    this.carroProvider.listar()
      .subscribe(carros => {
        this.listaCarros = carros;
        loading.dismiss();
      },
        error => {
          console.log(error);
          loading.dismiss();

          this.alertCtrl.create({
            title: "Erro",
            subTitle: 'Erro ao carregar os carros.',
            buttons: [{ text: 'OK' }]
          }).present();
        });
  }

  selectCar(carroSelecionado: Carro) {
    console.log(carroSelecionado);
    this.navCtrl.push(AcessoriosPage, { carroSelecionado });
  }
}
