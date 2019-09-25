import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AgendamentosListaPage } from '../pages/agendamentos-lista/agendamentos-lista';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UserServiceProvider } from '../providers/user-service/user-service';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('navContent') navContent: Nav;

  rootPage:any = LoginPage;
  paginas: any[] = [
    { titulo: 'Agendamentos', icone: 'calendar', componente: AgendamentosListaPage.name },
    { titulo: 'Perfil', icone: 'user', componente: PerfilPage.name }
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private userService: UserServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  redirectMenu(component) {
    this.navContent.push(component);
  }

  get usuarioLogado() {
    return this.userService.usuarioLogado;
  }
}