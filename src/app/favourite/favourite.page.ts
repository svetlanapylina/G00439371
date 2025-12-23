import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, } from '@ionic/angular/standalone';
import { FavouritesService, FavouriteRecipe } from '../services/favourite.service';
import { RouterLink } from '@angular/router';
import { RecipeCardComponent } from '../shared/components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, RouterLink, IonButtons, IonButton, IonIcon, RecipeCardComponent]
})

export class FavouritePage {
  favourites: FavouriteRecipe[] = [];

  constructor(private favouritesService: FavouritesService) { }

  async ionViewWillEnter(): Promise<void> {
    this.favourites = await this.favouritesService.getAll();
  }


  async removeFavourite(id: number): Promise<void> {
    await this.favouritesService.remove(id);
    this.favourites = this.favourites.filter(f => f.id !== id);
  }
}