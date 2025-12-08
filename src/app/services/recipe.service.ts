import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
}

interface SpoonacularSearchResponse {
  results: RecipeSearchResult[];
  offset: number;
  number: number;
  totalResults: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly apiUrl = environment.spoonacularUrl;
  private readonly apiKey = environment.spoonacularApiKey;

  constructor(private http: HttpClient) {}

  searchRecipes(query: string): Observable<RecipeSearchResult[]> {
    const trimmed = query.trim();
    if (!trimmed) return of([]);

    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('query', trimmed)
      .set('number', 10)
      .set('addRecipeInformation', true)
      .set('instructionsRequired', true);

    return this.http
      .get<SpoonacularSearchResponse>(this.apiUrl, { params })
      .pipe(map(res => res.results));
  }
}