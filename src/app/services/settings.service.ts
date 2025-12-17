import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


export type UnitSystem = 'metric' | 'us';

const STORAGE_KEY_UNITS = 'unitSystem';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private _storage!: Storage;

  constructor(private storage: Storage) {}

  private async ready(): Promise<Storage> {
    if (this._storage) return this._storage;
    this._storage = await this.storage.create();
    return this._storage;
  }

  async getUnitSystem(): Promise<UnitSystem> {
    const store = await this.ready();
    const value = await store.get(STORAGE_KEY_UNITS);
    return (value as UnitSystem) ?? 'metric'; // default
  }

  async setUnitSystem(unit: UnitSystem): Promise<void> {
    const store = await this.ready();
    await store.set(STORAGE_KEY_UNITS, unit);
  }
}
