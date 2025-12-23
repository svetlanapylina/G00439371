import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButtons, IonButton, IonIcon, IonRadio, IonRadioGroup, IonList, } from '@ionic/angular/standalone';
import { SettingsService, UnitSystem } from '../services/settings.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonItem, IonLabel, IonButtons, IonButton, IonIcon, IonRadio, IonRadioGroup, IonList, RouterLink]
})

export class SettingsPage {
  unitSystem: UnitSystem = 'metric';

  constructor(private settingsService: SettingsService) { }

  async ionViewWillEnter(): Promise<void> {
    this.unitSystem = await this.settingsService.getUnitSystem();
  }

  async onUnitChange(ev: CustomEvent): Promise<void> {
    const value = ev.detail.value as UnitSystem;
    this.unitSystem = value;
    await this.settingsService.setUnitSystem(value);
  }
}