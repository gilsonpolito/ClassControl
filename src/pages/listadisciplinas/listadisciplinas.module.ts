import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadisciplinasPage } from './listadisciplinas';

@NgModule({
  declarations: [
    ListadisciplinasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadisciplinasPage),
  ],
})
export class ListadisciplinasPageModule {}
