import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = 'joao@alura.com.br';
  senha: string = 'alura123';

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private userService: UserServiceProvider,
    private alertCtrl: AlertController) {
  }

  efetuarLogin() {
    this.userService.efetuarLogin(this.email, this.senha)
      .subscribe(user => {
        console.log('usuario logado = ', user);
        this.navCtrl.setRoot(HomePage);
      },
      (error: Error) => {
        this.alertCtrl.create({
          title: 'Erro',
          subTitle: 'Usuário não encontrado',
          buttons: [{ text: 'OK' }]
        }).present();
      });
  }
}