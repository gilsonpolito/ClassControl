import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Turma, TurmaProvider } from '../../providers/turma/turma';

@IonicPage()
@Component({
  selector: 'page-listaturmas',
  templateUrl: 'listaturmas.html',
})
export class ListaturmasPage {

  turmas: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private turmaProvider: TurmaProvider) {
  }

  ionViewDidEnter() {
    this.getAll();
  }

  getAll() {
    /*this.turmaProvider.getAll()
      .then((result: any[]) => {
        this.turmas = result;
      });*/
  }

  /*addProduct() {
    this.navCtrl.push('EditProductPage');
  }

  editProduct(id: number) {
    this.navCtrl.push('EditProductPage', { id: id });
  }

  removeProduct(product: Product) {
    this.productProvider.remove(product.id)
      .then(() => {
        // Removendo do array de produtos
        var index = this.products.indexOf(product);
        this.products.splice(index, 1);
        this.toast.create({ message: 'Produto removido.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterProducts(ev: any) {
    this.getAllProducts();
  }*/
}
