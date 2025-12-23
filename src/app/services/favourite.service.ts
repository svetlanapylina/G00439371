import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface FavouriteRecipe {
  id: number;
  title: string;
  image: string;
}

const STORAGE_KEY = 'favouriteRecipes';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private _storage!: Storage;

  constructor(private storage: Storage) { }

  private async ready(): Promise<Storage> {
    if (this._storage) return this._storage;
    this._storage = await this.storage.create();
    return this._storage;
  }

  async getAll(): Promise<FavouriteRecipe[]> {
    const store = await this.ready();
    const value = await store.get(STORAGE_KEY);
    return value ? (value as FavouriteRecipe[]) : [];
  }

  async isFavourite(id: number): Promise<boolean> {
    const all = await this.getAll();
    return all.some(r => r.id === id);
  }

  async add(recipe: FavouriteRecipe): Promise<void> {
    const all = await this.getAll();
    if (all.some(r => r.id === recipe.id)) return;

    const updated: FavouriteRecipe[] = [recipe, ...all];

    const store = await this.ready();
    await store.set(STORAGE_KEY, updated);
  }

  async remove(id: number): Promise<void> {
    const all = await this.getAll();
    const updated = all.filter(r => r.id !== id);

    const store = await this.ready();
    await store.set(STORAGE_KEY, updated);
  }


  async toggle(recipe: { id: number; title: string; image: string }): Promise<boolean> {
    const fav = await this.isFavourite(recipe.id);
    if (fav) {
      await this.remove(recipe.id);
      return false;
    } else {
      await this.add(recipe);
      return true;
    }
  }

  async clear(): Promise<void> {
    const store = await this.ready();
    await store.remove(STORAGE_KEY);
  }
}