import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, LoadingController, IonGrid, IonCard, IonCardContent, IonRow, IonCol, IonImg, IonText, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent } from '@ionic/angular/standalone';
import { PokemonService } from '../../services/pokemon';
import { PokemonInterface } from 'src/app/interfaces/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonText, IonImg, IonCol, IonRow, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid]
})
export class ListPokemonsPage {


  private pokemonService: PokemonService = inject(PokemonService);

  private loadingCtrl: LoadingController = inject(LoadingController);

  private router: Router = inject(Router)


  pokemons: PokemonInterface[] = [];


  constructor() { }

  ionViewWillEnter(){
    this.getMorePokemons();
  }

  async getMorePokemons(event?: InfiniteScrollCustomEvent){
    const promisePokemons = this.pokemonService.getPokemons();

    if(promisePokemons){
        let loading: any;
        if(!event){
            const loading = await this.loadingCtrl.create({
            message: 'Cargando...',
            spinner: 'dots',
            duration: 2000
        })
        loading.present();
        }

        promisePokemons.then(( pokemons: PokemonInterface[] ) => {
            this.pokemons = this.pokemons.concat(pokemons);
        })
        .catch((error) => console.log(error))
        .finally(() => {
            loading?.dismiss();
            event?.target.complete()
        })
    }
  }

  goToPage(pokemon: PokemonInterface){
    this.router.navigate(['pokemon-detail', pokemon.id]);
  }

}
