import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, LoadingController } from '@ionic/angular/standalone';
import { PokemonService } from '../../services/pokemon';
import { PokemonInterface } from 'src/app/interfaces/pokemon';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, JsonPipe]
})
export class ListPokemonsPage {


  private pokemonService: PokemonService = inject(PokemonService);

  pokemons: PokemonInterface[] = [];


  constructor(private loadingCtrl: LoadingController) { }

  ionViewWillEnter(){
    this.getMorePokemons();
  }

  async getMorePokemons(){
    const promisePokemons = this.pokemonService.getPokemons();

    if(promisePokemons){
        const loading = await this.loadingCtrl.create({
            message: 'Cargando...',
            spinner: 'dots',
            duration: 2000
        })
        loading.present();


        promisePokemons.then(( pokemons: PokemonInterface[] ) => {
            this.pokemons = this.pokemons.concat(pokemons);
        })
        .catch((error) => console.log(error))
        .finally(() => {
            loading.dismiss()
        })
    }
  }

}
