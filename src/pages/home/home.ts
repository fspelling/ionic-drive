import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public listaCarros: any[];

  constructor(public navCtrl: NavController) { }

  ngOnInit(): void {
    this.listaCarros = [
      { nome: 'Carro 1', preco: 22.22 },
      { nome: 'Carro 2', preco: 22.22 },
      { nome: 'Carro 3', preco: 22.22 },
      { nome: 'Carro 4', preco: 22.22 }
    ];
  }
}
