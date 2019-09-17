import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendamentosListaPage } from './agendamentos-lista';

@NgModule({
  declarations: [
    AgendamentosListaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendamentosListaPage),
  ],
})
export class AgendamentosListaPageModule {}
