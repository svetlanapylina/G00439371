import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonThumbnail, IonLabel, IonButtons, IonButton, IonIcon, } from '@ionic/angular/standalone';
import { FavouritesService, FavouriteRecipe } from '../services/favourite.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonList, IonItem, IonThumbnail, IonLabel, IonButtons, IonButton, IonIcon, ]
})

export class FavouritePage {
  favourites: FavouriteRecipe[] = [];

  constructor(private favouritesService: FavouritesService) {}

  async ionViewWillEnter(): Promise<void> {
    this.favourites = await this.favouritesService.getAll();
  }

  async onRemoveClick(event: Event, id: number): Promise<void> {
  event.preventDefault();
  event.stopPropagation();

  await this.removeFavourite(id);
}

  async removeFavourite(id: number): Promise<void> {
  await this.favouritesService.remove(id);
  this.favourites = this.favourites.filter(f => f.id !== id);
}
  
}

