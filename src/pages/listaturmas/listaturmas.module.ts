import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaturmasPage } from './listaturmas';

@NgModule({
  declarations: [
    ListaturmasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaturmasPage),
  ],
})
export class ListaturmasPageModule {}
