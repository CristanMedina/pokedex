import { Component, inject, Input } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, LoadingController, IonFab, IonFabButton, IonIcon, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonProgressBar } from '@ionic/angular/standalone';
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
  imports: [IonProgressBar, IonText, IonCol, IonRow, IonGrid, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonImg, IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonFab,
    IonFabButton,
    IonIcon]
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

    toNumber(strNumber: string): number{
        return Number(strNumber);
    }
}
