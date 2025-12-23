import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonIcon, IonButtons, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecipeService, RecipeSearchResult, } from '../services/recipe.service';
import { NgIf, NgFor } from '@angular/common';
import { RecipeCardComponent } from '../shared/components/recipe-card/recipe-card.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonSearchbar, NgIf, NgFor, FormsModule, RouterLink, IonIcon, IonButtons, IonText, RecipeCardComponent],
})


export class HomePage {
  searchQuery = '';
  results: RecipeSearchResult[] = [];
  hasSearched = false;


  constructor(private recipeService: RecipeService) { }

  async onSearch() {
    const query = this.searchQuery.trim();

    if (!query) {
      this.results = [];
      this.hasSearched = false;
      return;
    }

    try {
      this.results = await this.recipeService.searchRecipes(query);
    } catch (err) {
      console.error('Error searching recipes', err);
      this.results = [];
    } finally {
      this.hasSearched = true;
    }
  }

  onClearSearch() {
    this.searchQuery = '';
    this.results = [];
    this.hasSearched = false;
  }
}