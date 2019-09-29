import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor( 
    private userService: UserServiceProvider,
    private camera: Camera) {
  }

  tirarFoto() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      correctOrientation: true,
      saveToPhotoAlbum: true
    })
    .then(fotoUri => this.userService.salvarAvatar(fotoUri))
    .catch(error => console.log(error))
  }

  get usuarioLogado() {
    return this.userService.usuarioLogado;
  }

  get avatar() {
    return this.userService.obterAvatar();
  }
}