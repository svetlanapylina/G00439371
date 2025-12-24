import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonIcon, IonText } from '@ionic/angular/standalone';
import { RecipeService, RecipeDetails, RecipeIngredient, RecipeStep, } from '../services/recipe.service';
import { FavouritesService } from '../services/favourite.service';
import { SettingsService, UnitSystem } from '../services/settings.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [NgIf, NgFor, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonIcon, IonText, RouterLink,]
})


export class RecipeDetailsPage implements OnInit {
  recipe: RecipeDetails | null = null;
  isFavourite = false;
  unitSystem: UnitSystem = 'metric';
  errorMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private favouritesService: FavouritesService,
    private settingsService: SettingsService
  ) { }


  async ngOnInit(): Promise<void> {
    this.unitSystem = await this.settingsService.getUnitSystem();
    this.errorMessage = null;

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const id = Number(idParam);

    try {
      this.recipe = await this.recipeService.getRecipeDetails(id);
      this.isFavourite = await this.favouritesService.isFavourite(id);
    } catch (err) {
      console.error('Error loading recipe details', err);
      this.errorMessage = 'Cannot load recipe details. Please try again.'
      this.recipe = null;
    }
  }

  async onToggleFavourite(): Promise<void> {
    if (!this.recipe) return;

    this.isFavourite = await this.favouritesService.toggle({
      id: this.recipe.id,
      title: this.recipe.title,
      image: this.recipe.image,
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

  getIngredientAmountText(ing: RecipeIngredient): string {
    const m = this.unitSystem === 'us' ? ing.measures?.us : ing.measures?.metric;
    if (!m) return '';
    return `${m.amount} ${m.unitLong}`;
  }
}