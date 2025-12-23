import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { environment } from '../../environments/environment';

export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
}

interface SpoonacularSearchResponse {
  results: RecipeSearchResult[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface IngredientMeasure {
  amount: number;
  unitLong: string;
}

export interface RecipeIngredient {
  id: number;
  original: string;
  image: string;
  measures: {
    us: IngredientMeasure;
    metric: IngredientMeasure;
  };
}

export interface RecipeStep {
  number: number;
  step: string;
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  extendedIngredients: RecipeIngredient[];
  analyzedInstructions: { steps: RecipeStep[] }[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly apiUrl = environment.spoonacularUrl;
  private readonly apiKey = environment.spoonacularApiKey;
  private readonly apiRecipeDetailsUrl = environment.spoonacularRecipeDetailsUrl;

  constructor() { }

  async searchRecipes(query: string): Promise<RecipeSearchResult[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const options: HttpOptions = {
      url: this.apiUrl,
      method: 'GET',
      params: {
        apiKey: this.apiKey,
        query: trimmed,
        number: '10',
        addRecipeInformation: 'true',
        instructionsRequired: 'true',
      },
    };

    const res = await CapacitorHttp.request(options);
    const data = res.data as SpoonacularSearchResponse;
    return data.results ?? [];
  }

  async getRecipeDetails(id: number): Promise<RecipeDetails> {
    const url = `${this.apiRecipeDetailsUrl}/${id}/information`;

    const options: HttpOptions = {
      url,
      method: 'GET',
      params: {
        apiKey: this.apiKey,
        includeNutrition: 'false',
      },
    };

    const res = await CapacitorHttp.request(options);
    return res.data as RecipeDetails;
  }
}