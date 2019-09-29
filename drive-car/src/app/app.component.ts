import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';

import { AgendamentosListaPage } from '../pages/agendamentos-lista/agendamentos-lista';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../models/agendamento';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('navContent') navContent: Nav;

  rootPage: any = LoginPage;
  paginas: any[] = [
    { titulo: 'Agendamentos', icone: 'calendar', componente: AgendamentosListaPage.name },
    { titulo: 'Perfil', icone: 'user', componente: PerfilPage.name }
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private userService: UserServiceProvider,
    private oneSignal: OneSignal,
    private agendamentoDao: AgendamentoDaoProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.configurarOneSignal();
    });
  }

  configurarOneSignal() {
    const iosConfig = {
      KOSSettingsKeyAutoPrompt: true,
      KOSSettingsKeyInAppLaunchURL: false
    };

    this.oneSignal
      .startInit('b1d1aa6e-bbd6-4179-a884-d85ba1c7389b', '716673286813')
      .iOSSettings(iosConfig);

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived()
      .subscribe((notification: OSNotification) => {
        const dadosAdicionais = notification.payload.additionalData;
        const agendamentoId = dadosAdicionais['agendamento-id'];

        this.agendamentoDao.recuperar(agendamentoId)
          .subscribe((agendamento: Agendamento) => {
            agendamento.confirmado = true;
            this.agendamentoDao.salvar(agendamento);
          });
      });

    this.oneSignal.endInit();
  }

  redirectMenu(component) {
    this.navContent.push(component);
  }

  get usuarioLogado() {
    return this.userService.usuarioLogado;
  }

  get avatar() {
    return this.userService.obterAvatar();
  }
}