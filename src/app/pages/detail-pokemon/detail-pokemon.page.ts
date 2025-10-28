import { Component, inject, Input } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, LoadingController, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { PokemonInterface } from 'src/app/interfaces/pokemon';
import { PokemonService } from '../../services/pokemon';
import { closeOutline } from 'ionicons/icons'
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonFab,
    IonFabButton,
    IonIcon,
    JsonPipe]
})
export class DetailPokemonPage{

    @Input() id!: number;

    private loadingCtr: LoadingController = inject(LoadingController);

    private router: Router = inject(Router);

    private servicioPokemon: PokemonService = inject(PokemonService);
    pokemon!: PokemonInterface

    constructor() {
        addIcons({closeOutline});
     }

    ionViewWillEnter(){
        console.log(`El id es: ${this.id}`);
        this.servicioPokemon.getPokemon(this.id)
        .then((pokemon: PokemonInterface) => this.pokemon = pokemon)
    }

    goBack(){
        this.router.navigateByUrl('list-pokemons')
    }
}
