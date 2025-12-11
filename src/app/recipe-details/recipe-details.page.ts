import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonList, IonItem, IonLabel, IonButton, } from '@ionic/angular/standalone';
import { RecipeService, RecipeDetails, RecipeIngredient, RecipeStep, } from '../services/recipe.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [NgIf, NgFor, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonList, IonItem, IonLabel, IonButton, ]
})


export class RecipeDetailsPage implements OnInit {
  recipe: RecipeDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const id = Number(idParam);
    this.recipeService.getRecipeDetails(id).subscribe((details) => {
      this.recipe = details;
    });
  }

  getIngredientImageUrl(ingredient: RecipeIngredient): string {
    return `https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}`;
  }

  get steps(): RecipeStep[] {
    if (!this.recipe || !this.recipe.analyzedInstructions?.length) {
      return [];
    }
    return this.recipe.analyzedInstructions[0].steps || [];
  }
}