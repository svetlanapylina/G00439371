import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButtons, IonText} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecipeService, RecipeSearchResult, } from '../services/recipe.service';
import { NgIf, NgFor } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, NgIf, NgFor, FormsModule, RouterLink, IonIcon, IonButtons, IonText],
})


export class HomePage {
  searchQuery = '';
  results: RecipeSearchResult[] = [];
  hasSearched = false;


 constructor(private recipeService: RecipeService) {}

  onSearch() {
    const query = this.searchQuery.trim();

    if (!query) {
      this.results = [];
      this.hasSearched = false;
      return;
    }

    this.recipeService.searchRecipes(query).subscribe({
      next: (recipes) => {
        this.results = recipes;
        this.hasSearched = true;
      },
      error: (err) => {
        console.error('Error searching recipes', err);
        this.results = [];
        this.hasSearched = true;
      },
    });
  }
}