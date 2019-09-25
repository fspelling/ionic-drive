import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor( 
    private userService: UserServiceProvider) {
  }

  get usuarioLogado() {
    return this.userService.usuarioLogado;
  }
}