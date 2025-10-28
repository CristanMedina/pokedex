import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PokemonInterface } from 'src/app/interfaces/pokemon';
import { PokemonService } from '../../services/pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailPokemonPage{

    @Input() id!: number;

    private servicioPokemon: PokemonService = inject(PokemonService);
    pokemon!: PokemonInterface

    constructor() { }

    ionViewWillEnter(){
        console.log(`El id es: ${this.id}`);
        this.servicioPokemon.getPokemon(this.id)
        .then((pokemon: PokemonInterface) => this.pokemon = pokemon)
    }
}
